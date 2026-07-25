import sqlite3
import json
import os
from datetime import datetime, timedelta

DB_PATH = r"C:\Users\manoj\.local\share\mimocode\mimocode.db"
PROJECT_DIR = r"H:\Users\manoj\Downloads\capsule"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# List tables
tables = cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
print("=== TABLES ===")
for t in tables:
    print(f"  {t['name']}")

# Get schema for key tables
for tbl in ['session', 'message', 'part']:
    row = cur.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name=?", (tbl,)).fetchone()
    if row:
        print(f"\n=== SCHEMA: {tbl} ===")
        print(row['sql'])

# Get all capsule sessions
print("\n=== CAPSULE SESSIONS ===")
sessions = cur.execute("SELECT id, title, time_created FROM session WHERE directory LIKE ?", (f"%capsule%",)).fetchall()
for s in sessions:
    ts = datetime.fromtimestamp(s['time_created'] / 1000).isoformat()
    print(f"  {s['id']}: {s['title']} ({ts})")

# Get sessions from last 7 days
cutoff = (datetime.now() - timedelta(days=7)).timestamp() * 1000
print(f"\n=== SESSIONS FROM LAST 7 DAYS (cutoff={datetime.fromtimestamp(cutoff/1000).isoformat()}) ===")
recent = cur.execute("SELECT id, title, directory, time_created FROM session WHERE time_created >= ? ORDER BY time_created DESC", (cutoff,)).fetchall()
for s in recent:
    ts = datetime.fromtimestamp(s['time_created'] / 1000).isoformat()
    print(f"  {s['id']}: [{s['directory']}] {s['title']} ({ts})")

# Get message count per capsule session
print("\n=== MESSAGE COUNTS PER CAPSULE SESSION ===")
for s in sessions:
    count = cur.execute("SELECT COUNT(*) as cnt FROM message WHERE session_id=?", (s['id'],)).fetchone()['cnt']
    print(f"  {s['id']}: {count} messages")

# Get assistant messages with tool calls from capsule sessions
print("\n=== ASSISTANT TOOL CALLS FROM CAPSULE SESSIONS ===")
for s in sessions:
    print(f"\n--- Session: {s['id']} ({s['title']}) ---")
    msgs = cur.execute("""
        SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created
        FROM message m 
        WHERE m.session_id=? AND json_extract(m.data, '$.role')='assistant'
        ORDER BY m.time_created
    """, (s['id'],)).fetchall()
    for m in msgs:
        # Get parts for this message
        parts = cur.execute("""
            SELECT json_extract(data, '$.type') as ptype, json_extract(data, '$.tool') as tool,
                   json_extract(data, '$.text') as text, substr(data, 1, 300) as preview
            FROM part WHERE message_id=? ORDER BY time_created
        """, (m['id'],)).fetchall()
        for p in parts:
            if p['ptype'] == 'tool' and p['tool']:
                print(f"  Tool: {p['tool']}")
            elif p['ptype'] == 'text' and p['text']:
                txt = p['text'][:200].replace('\n', ' ')
                print(f"  Text: {txt}")

# Get user messages to check for rules/decisions
print("\n=== USER MESSAGES (KEYWORDS) ===")
for s in sessions:
    msgs = cur.execute("""
        SELECT json_extract(m.data, '$.content') as content FROM message m 
        WHERE m.session_id=? AND json_extract(m.data, '$.role')='user'
        ORDER BY m.time_created
    """, (s['id'],)).fetchall()
    for m in msgs:
        if m['content']:
            c = str(m['content']).lower()
            keywords = ['always', 'never', 'remember', 'rule', 'decision', 'decided', 'workflow', 'repeat', 'every time']
            if any(kw in c for kw in keywords):
                content_preview = str(m['content'])[:300].replace('\n', ' ')
                print(f"  [{s['title']}] {content_preview}")

# Check part table for checkpoint parts
print("\n=== CHECKPOINT PARTS ===")
cps = cur.execute("SELECT session_id, substr(data, 1, 500) as preview FROM part WHERE json_extract(data, '$.type')='checkpoint' ORDER BY time_created DESC LIMIT 10").fetchall()
for cp in cps:
    print(f"  Session: {cp['session_id']}")
    print(f"  Preview: {cp['preview'][:300]}")
    print()

conn.close()
