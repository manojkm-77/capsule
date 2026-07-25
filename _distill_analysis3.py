import sqlite3
import json
import time

DB_PATH = 'C:/Users/manoj/.local/share/mimocode/mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cutoff_ms = int((time.time() - 30*24*3600) * 1000)

# Check message data format
print("=" * 60)
print("SAMPLE MESSAGE DATA FORMAT")
print("=" * 60)
cur.execute("""
    SELECT data FROM message
    WHERE json_extract(data, '$.role') = 'user'
    AND session_id = 'ses_06705b408ffen3rJOI6wFGN3eY'
    LIMIT 2
""")
for r in cur.fetchall():
    d = json.loads(r['data'])
    print(json.dumps(d, indent=2)[:500])
    print("---")

# Get actual user messages from "fix settings" sessions
print("\n" + "=" * 60)
print("FIX SETTINGS SESSION - USER MESSAGES")
print("=" * 60)
cur.execute("""
    SELECT id, data FROM message
    WHERE session_id = 'ses_06705b408ffen3rJOI6wFGN3eY'
    ORDER BY time_created
    LIMIT 5
""")
for r in cur.fetchall():
    d = json.loads(r['data'])
    role = d.get('role', '?')
    content = d.get('content', d.get('text', ''))
    if isinstance(content, list):
        content = ' '.join([c.get('text', str(c)) for c in content if isinstance(c, dict)])
    elif content is None:
        content = str(d)[:300]
    print(f"  {role}: {str(content)[:300]}")
    print()

# ========== Repeated user request patterns ==========
print("=" * 60)
print("REPEATED USER REQUEST PATTERNS ACROSS ALL PROJECTS")
print("=" * 60)

# Get all user messages across all projects
cur.execute("""
    SELECT s.directory, m.data, m.time_created
    FROM message m
    JOIN session s ON s.id = m.session_id
    WHERE json_extract(m.data, '$.role') = 'user'
      AND m.time_created > ?
      AND s.title NOT LIKE '%checkpoint%'
    ORDER BY m.time_created
""", (cutoff_ms,))

patterns = {}
for r in cur.fetchall():
    d = json.loads(r['data'])
    content = d.get('content', d.get('text', ''))
    if isinstance(content, list):
        texts = [c.get('text', '') for c in content if isinstance(c, dict)]
        content = ' '.join(texts)
    if not content:
        continue
    content_lower = str(content).lower().strip()
    proj = (r['directory'] or 'unknown')[:40]

    # Categorize
    if 'vercel' in content_lower:
        patterns.setdefault('Vercel deploy requests', []).append(proj)
    elif 'responsive' in content_lower or 'mobile' in content_lower:
        patterns.setdefault('Responsive/mobile requests', []).append(proj)
    elif 'prisma' in content_lower:
        patterns.setdefault('Prisma/DB requests', []).append(proj)
    elif 'fix' in content_lower and ('settings' in content_lower or 'doctor' in content_lower):
        patterns.setdefault('Fix settings/doctor', []).append(proj)
    elif content_lower.startswith('hi') or content_lower.startswith('hello'):
        patterns.setdefault('Greeting-only messages', []).append(proj)
    elif 'go on' in content_lower or 'continue' in content_lower:
        patterns.setdefault('Continue/go on messages', []).append(proj)
    elif 'expo' in content_lower:
        patterns.setdefault('Expo/React Native requests', []).append(proj)
    elif 'analyse' in content_lower or 'analyze' in content_lower or 'summary' in content_lower:
        patterns.setdefault('Code analysis requests', []).append(proj)
    elif 'production ready' in content_lower or 'deploy' in content_lower:
        patterns.setdefault('Production/deploy requests', []).append(proj)
    elif 'build' in content_lower or 'error' in content_lower:
        patterns.setdefault('Build/error fix requests', []).append(proj)

for pattern, projs in sorted(patterns.items(), key=lambda x: -len(x[1])):
    proj_counts = {}
    for p in projs:
        proj_counts[p] = proj_counts.get(p, 0) + 1
    print(f"\n  {pattern} ({len(projs)}x):")
    for p, c in sorted(proj_counts.items(), key=lambda x: -x[1]):
        print(f"    {c:3d}x  {p}")

conn.close()
