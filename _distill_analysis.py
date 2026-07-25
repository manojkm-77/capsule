import sqlite3
import json
import time
import re
from collections import Counter, defaultdict

DB_PATH = 'C:/Users/manoj/.local/share/mimocode/mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cutoff_ms = int((time.time() - 30*24*3600) * 1000)

# ========== 1. REPEATED TOOL USAGE PATTERNS ==========
print("=" * 60)
print("1. MOST COMMON TOOL CALLS (last 30 days)")
print("=" * 60)
cur.execute("""
    SELECT json_extract(p.data, '$.tool') as tool,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND m.time_created > ?
    GROUP BY tool
    ORDER BY n DESC
    LIMIT 30
""", (cutoff_ms,))
for r in cur.fetchall():
    print(f"  {r['n']:4d}  {r['tool']}")

# ========== 2. REPEATED COMMAND SEQUENCES ==========
print("\n" + "=" * 60)
print("2. MOST COMMON SHELL COMMANDS")
print("=" * 60)
cur.execute("""
    SELECT json_extract(p.data, '$.state.input') as cmd_input,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'bash'
      AND m.time_created > ?
    GROUP BY cmd_input
    ORDER BY n DESC
    LIMIT 40
""", (cutoff_ms,))
for r in cur.fetchall():
    inp = r['cmd_input']
    if inp:
        # Try to parse JSON
        try:
            obj = json.loads(inp)
            cmd = obj.get('command', '')[:120]
        except:
            cmd = str(inp)[:120]
        print(f"  {r['n']:4d}  {cmd}")

# ========== 3. REPEATED READ TOOL USAGE ==========
print("\n" + "=" * 60)
print("3. MOST COMMONLY READ FILES")
print("=" * 60)
cur.execute("""
    SELECT json_extract(p.data, '$.state.input') as input_json,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'read'
      AND m.time_created > ?
    GROUP BY input_json
    ORDER BY n DESC
    LIMIT 20
""", (cutoff_ms,))
for r in cur.fetchall():
    inp = r['input_json']
    if inp:
        try:
            obj = json.loads(inp)
            fp = obj.get('file_path', '')[:120]
        except:
            fp = str(inp)[:120]
        print(f"  {r['n']:4d}  {fp}")

# ========== 4. REPEATED USER KEYWORDS ==========
print("\n" + "=" * 60)
print("4. REPEATED USER PHRASES / KEYWORDS")
print("=" * 60)
cur.execute("""
    SELECT data FROM message
    WHERE json_extract(data, '$.role') = 'user'
      AND time_created > ?
""", (cutoff_ms,))
phrases = Counter()
keywords = Counter()
search_terms = ['again', 'every time', 'like last time', 'the usual', 'repeat',
                'same as before', 'deploy', 'vercel', 'prisma', 'responsive',
                'mobile', 'fix', 'build', 'error', 'preview', 'settings']
for row in cur.fetchall():
    try:
        d = json.loads(row['data'])
        content = d.get('content', '')
        if isinstance(content, list):
            content = ' '.join([c.get('text', '') for c in content if isinstance(c, dict)])
        content = content.lower()
        for term in search_terms:
            if term in content:
                keywords[term] += 1
    except:
        pass

for kw, cnt in keywords.most_common(20):
    print(f"  {cnt:4d}  '{kw}'")

# ========== 5. REPEATED EDIT TOOL USAGE ==========
print("\n" + "=" * 60)
print("5. MOST COMMONLY EDITED FILES")
print("=" * 60)
cur.execute("""
    SELECT json_extract(p.data, '$.state.input') as input_json,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'edit'
      AND m.time_created > ?
    GROUP BY input_json
    ORDER BY n DESC
    LIMIT 20
""", (cutoff_ms,))
for r in cur.fetchall():
    inp = r['input_json']
    if inp:
        try:
            obj = json.loads(inp)
            fp = obj.get('file_path', '')[:120]
        except:
            fp = str(inp)[:120]
        print(f"  {r['n']:4d}  {fp}")

# ========== 6. WORKFLOW: REPEATED SESSION TITLE PATTERNS ==========
print("\n" + "=" * 60)
print("6. SESSION TITLE CATEGORIES (non-checkpoint)")
print("=" * 60)
cur.execute("""
    SELECT title FROM session
    WHERE time_created > ?
      AND title NOT LIKE '%checkpoint%'
""", (cutoff_ms,))
title_patterns = Counter()
for row in cur.fetchall():
    title = row['title'] or ''
    title_patterns[title] += 1
for title, cnt in title_patterns.most_common(30):
    print(f"  {cnt:4d}  {title}")

# ========== 7. GLOB TOOL USAGE ==========
print("\n" + "=" * 60)
print("7. MOST COMMON GLOB PATTERNS")
print("=" * 60)
cur.execute("""
    SELECT json_extract(p.data, '$.state.input') as input_json,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'glob'
      AND m.time_created > ?
    GROUP BY input_json
    ORDER BY n DESC
    LIMIT 20
""", (cutoff_ms,))
for r in cur.fetchall():
    inp = r['input_json']
    if inp:
        try:
            obj = json.loads(inp)
            pat = obj.get('pattern', '')[:120]
        except:
            pat = str(inp)[:120]
        print(f"  {r['n']:4d}  {pat}")

conn.close()
