import sqlite3
import json
import time
from collections import Counter

DB_PATH = 'C:/Users/manoj/.local/share/mimocode/mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cutoff_ms = int((time.time() - 30*24*3600) * 1000)

# Check part data format (actual text content is in parts)
print("=" * 60)
print("SAMPLE PART DATA FORMAT")
print("=" * 60)
cur.execute("""
    SELECT data FROM part
    WHERE json_extract(data, '$.type') = 'text'
    LIMIT 3
""")
for r in cur.fetchall():
    d = json.loads(r['data'])
    print(json.dumps(d, indent=2)[:500])
    print("---")

# Get all user text parts across sessions with project info
print("\n" + "=" * 60)
print("USER MESSAGE TEXT BY PROJECT")
print("=" * 60)

cur.execute("""
    SELECT s.directory, s.title as session_title, json_extract(p.data, '$.text') as text, m.time_created
    FROM part p
    JOIN message m ON m.id = p.message_id
    JOIN session s ON s.id = p.session_id
    WHERE json_extract(p.data, '$.type') = 'text'
      AND json_extract(m.data, '$.role') = 'user'
      AND m.time_created > ?
      AND s.title NOT LIKE '%checkpoint%'
    ORDER BY m.time_created
""", (cutoff_ms,))

# Collect user messages
user_msgs = []
for r in cur.fetchall():
    text = r['text'] or ''
    if not text.strip():
        continue
    user_msgs.append({
        'dir': (r['directory'] or 'unknown'),
        'session': r['session_title'] or '',
        'text': text,
        'time': r['time_created']
    })

print(f"\nTotal user messages with text: {len(user_msgs)}")

# Categorize
patterns = {}
for msg in user_msgs:
    t = msg['text'].lower().strip()
    proj = msg['dir'][:50]
    if 'vercel' in t:
        patterns.setdefault('Vercel deploy', []).append((proj, msg['text'][:120]))
    elif 'responsive' in t or 'mobile' in t:
        patterns.setdefault('Responsive/mobile', []).append((proj, msg['text'][:120]))
    elif 'prisma' in t:
        patterns.setdefault('Prisma/DB', []).append((proj, msg['text'][:120]))
    elif 'fix' in t and ('setting' in t or 'doctor' in t):
        patterns.setdefault('Fix settings/doctor', []).append((proj, msg['text'][:120]))
    elif t.startswith('hi') or t.startswith('hello'):
        patterns.setdefault('Greeting-only', []).append((proj, msg['text'][:60]))
    elif 'go on' in t or 'continue' in t:
        patterns.setdefault('Continue/go on', []).append((proj, msg['text'][:60]))
    elif 'expo' in t:
        patterns.setdefault('Expo/React Native', []).append((proj, msg['text'][:120]))
    elif 'analyse' in t or 'analyze' in t or 'summary' in t:
        patterns.setdefault('Code analysis', []).append((proj, msg['text'][:120]))
    elif 'production' in t or 'deploy' in t:
        patterns.setdefault('Production/deploy', []).append((proj, msg['text'][:120]))
    elif 'build' in t or 'error' in t or 'fix' in t:
        patterns.setdefault('Build/error fix', []).append((proj, msg['text'][:120]))
    elif 'database' in t or 'postgres' in t or 'sqlite' in t:
        patterns.setdefault('Database issues', []).append((proj, msg['text'][:120]))
    elif 'auth' in t or 'login' in t:
        patterns.setdefault('Auth issues', []).append((proj, msg['text'][:120]))
    elif 'css' in t or 'style' in t or 'tailwind' in t:
        patterns.setdefault('CSS/styling', []).append((proj, msg['text'][:120]))
    elif 'api' in t and ('endpoint' in t or 'route' in t):
        patterns.setdefault('API endpoints', []).append((proj, msg['text'][:120]))

for pattern, entries in sorted(patterns.items(), key=lambda x: -len(x[1])):
    proj_counts = {}
    for proj, _ in entries:
        proj_counts[proj] = proj_counts.get(proj, 0) + 1
    print(f"\n  {pattern} ({len(entries)}x):")
    for p, c in sorted(proj_counts.items(), key=lambda x: -x[1])[:5]:
        print(f"    {c:3d}x  {p}")
    # Show sample texts
    for proj, text in entries[:2]:
        print(f"      -> {text[:120]}")

# ========== LOOK FOR CROSS-PROJECT REPEATED WORKFLOWS ==========
print("\n" + "=" * 60)
print("CROSS-PROJECT REPEATED WORKFLOWS")
print("=" * 60)

# Full-text search for specific repeated patterns
search_patterns = {
    'ts build/typecheck': ['npx tsc', 'tsc --noEmit', 'tsc -b'],
    'npm/yarn build': ['npm run build', 'npx vite build', 'yarn build'],
    'expo commands': ['expo prebuild', 'expo start', 'expo go'],
    'vercel deploy': ['vercel deploy', 'vercel --prod'],
    'pytest': ['pytest', 'python -m pytest'],
    'git operations': ['git status', 'git commit', 'git push'],
    'start dev server': ['localhost:5173', 'localhost:3000', 'localhost:8001', 'Start-Process'],
    'docker': ['docker compose', 'docker-compose', 'docker run'],
    'database migration': ['prisma migrate', 'prisma db push', 'alembic'],
}

cur.execute("""
    SELECT json_extract(p.data, '$.tool') as tool,
           json_extract(p.data, '$.state.input') as input_text,
           s.directory
    FROM part p
    JOIN message m ON m.id = p.message_id
    JOIN session s ON s.id = p.session_id
    WHERE json_extract(p.data, '$.type') = 'tool'
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.tool') IN ('bash', 'Bash', 'PowerShell')
      AND m.time_created > ?
""", (cutoff_ms,))

tool_uses = {}
for r in cur.fetchall():
    inp = r['input_text'] or ''
    try:
        obj = json.loads(inp)
        cmd = obj.get('command', '')
    except:
        cmd = inp
    cmd_lower = cmd.lower()
    proj = (r['directory'] or 'unknown')[:50]

    for category, keywords in search_patterns.items():
        for kw in keywords:
            if kw.lower() in cmd_lower:
                tool_uses.setdefault(category, {}).setdefault(proj, Counter())
                # Normalize the command
                tool_uses[category][proj][cmd[:80]] += 1
                break

for category, proj_cmds in sorted(tool_uses.items()):
    total = sum(sum(cmds.values()) for cmds in proj_cmds.values())
    projs = list(proj_cmds.keys())
    print(f"\n  {category} ({total} total across {len(projs)} projects):")
    for proj, cmds in sorted(proj_cmds.items(), key=lambda x: -sum(x[1].values())):
        total_proj = sum(cmds.values())
        top_cmd = cmds.most_common(1)[0]
        print(f"    {total_proj:3d}x  {proj}")
        for cmd, cnt in cmds.most_common(2):
            print(f"         {cnt:3d}x  {cmd[:100]}")

conn.close()
