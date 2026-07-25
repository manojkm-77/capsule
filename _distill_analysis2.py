import sqlite3
import json
import time

DB_PATH = 'C:/Users/manoj/.local/share/mimocode/mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cutoff_ms = int((time.time() - 30*24*3600) * 1000)

# ========== 1. "Help me fix Claude Code settings" sessions ==========
print("=" * 60)
print("1. 'Fix Claude Code settings' SESSION CONTENT")
print("=" * 60)
cur.execute("""
    SELECT id, title, directory, time_created
    FROM session
    WHERE title LIKE '%settings%'
      AND time_created > ?
    ORDER BY time_created
""", (cutoff_ms,))
for r in cur.fetchall():
    sid = r['id']
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"\n--- {sid} | {tc} | {r['title'][:80]} ---")
    # Get user messages from this session
    cur2 = conn.cursor()
    cur2.execute("""
        SELECT json_extract(data, '$.content') as content, time_created
        FROM message
        WHERE session_id = ? AND json_extract(data, '$.role') = 'user'
        ORDER BY time_created
        LIMIT 3
    """, (sid,))
    for m in cur2.fetchall():
        content = m['content']
        if isinstance(content, list):
            content = ' '.join([c.get('text', '') for c in content if isinstance(c, dict)])
        print(f"  User: {str(content)[:200]}")

# ========== 2. RadiFlow sessions ==========
print("\n" + "=" * 60)
print("2. RADIFLOW SESSIONS (rabbit directory)")
print("=" * 60)
cur.execute("""
    SELECT id, title, time_created
    FROM session
    WHERE directory LIKE '%rabbit%'
      AND title NOT LIKE '%checkpoint%'
      AND time_created > ?
    ORDER BY time_created
""", (cutoff_ms,))
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"  {tc} | {r['title'][:120]}")

# ========== 3. Namma/Rider sessions ==========
print("\n" + "=" * 60)
print("3. NAMMA/RIDER SESSIONS")
print("=" * 60)
cur.execute("""
    SELECT id, title, time_created
    FROM session
    WHERE directory LIKE '%namma%'
      AND title NOT LIKE '%checkpoint%'
      AND time_created > ?
    ORDER BY time_created
""", (cutoff_ms,))
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"  {tc} | {r['title'][:120]}")

# ========== 4. CAPSULE sessions (this project) ==========
print("\n" + "=" * 60)
print("4. CAPSULE SESSIONS (this project)")
print("=" * 60)
cur.execute("""
    SELECT id, title, time_created
    FROM session
    WHERE directory LIKE '%capsule%'
      AND title NOT LIKE '%checkpoint%'
      AND time_created > ?
    ORDER BY time_created
""", (cutoff_ms,))
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"  {tc} | {r['title'][:120]}")

# ========== 5. "Help me fix" / "/doctor" sessions ==========
print("\n" + "=" * 60)
print("5. /doctor and /fix settings sessions (content)")
print("=" * 60)
cur.execute("""
    SELECT id, title, directory, time_created
    FROM session
    WHERE (title LIKE '%doctor%' OR title LIKE '%settings%' OR title LIKE '%config%')
      AND title NOT LIKE '%checkpoint%'
      AND time_created > ?
    ORDER BY time_created
""", (cutoff_ms,))
for r in cur.fetchall():
    sid = r['id']
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"\n--- {sid} | {tc} | {r['title'][:100]} ---")
    # Get user + assistant messages
    cur2 = conn.cursor()
    cur2.execute("""
        SELECT json_extract(data, '$.role') as role,
               json_extract(data, '$.content') as content,
               time_created
        FROM message
        WHERE session_id = ?
        ORDER BY time_created
        LIMIT 10
    """, (sid,))
    for m in cur2.fetchall():
        role = m['role']
        content = m['content']
        if isinstance(content, list):
            content = ' '.join([c.get('text', '') for c in content if isinstance(c, dict)])
        print(f"  {role}: {str(content)[:200]}")

# ========== 6. Unique user commands per project ==========
print("\n" + "=" * 60)
print("6. USER MESSAGE COUNTS BY DIRECTORY")
print("=" * 60)
cur.execute("""
    SELECT s.directory, count(*) as n
    FROM message m
    JOIN session s ON s.id = m.session_id
    WHERE json_extract(m.data, '$.role') = 'user'
      AND m.time_created > ?
    GROUP BY s.directory
    ORDER BY n DESC
    LIMIT 15
""", (cutoff_ms,))
for r in cur.fetchall():
    d = (r['directory'] or 'none')[:80]
    print(f"  {r['n']:4d}  {d}")

conn.close()
