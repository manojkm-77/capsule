import sqlite3
import json
from datetime import datetime

DB_PATH = r"C:\Users\manoj\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# === Responsive mobile version session (main work session) ===
SID = "ses_067054a5effekaJGrQS9vrwU65"
print(f"=== DETAILED MESSAGES: {SID} ===\n")

msgs = cur.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created, m.agent_id
    FROM message m 
    WHERE m.session_id=?
    ORDER BY m.time_created
""", (SID,)).fetchall()

for m in msgs:
    role = m['role']
    agent = m['agent_id']
    ts = datetime.fromtimestamp(m['time_created'] / 1000).strftime('%H:%M:%S')
    parts = cur.execute("""
        SELECT json_extract(data, '$.type') as ptype, 
               json_extract(data, '$.tool') as tool,
               json_extract(data, '$.text') as text,
               json_extract(data, '$.state.output') as output,
               substr(json_extract(data, '$.state.input'), 1, 200) as input_preview
        FROM part WHERE message_id=? ORDER BY time_created
    """, (m['id'],)).fetchall()
    
    agent_tag = f" [agent={agent}]" if agent and agent != 'main' else ""
    print(f"[{ts}] {role}{agent_tag}")
    for p in parts:
        if p['ptype'] == 'text' and p['text']:
            print(f"  TEXT: {p['text'][:500]}")
        elif p['ptype'] == 'tool' and p['tool']:
            print(f"  TOOL: {p['tool']}")
            if p['input_preview']:
                print(f"    INPUT: {p['input_preview'][:200]}")
            if p['output']:
                out = str(p['output'])[:500].replace('\n', ' ')
                print(f"    OUTPUT: {out}")
    print()

# === Checkpoint-writer session ===
print("\n=== CHECKPOINT WRITER SESSION ===\n")
SID2 = "ses_067048428ffeiv3gpuw1cVOYcw"
msgs2 = cur.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created
    FROM message m WHERE m.session_id=? ORDER BY m.time_created
""", (SID2,)).fetchall()

for m in msgs2:
    parts = cur.execute("""
        SELECT json_extract(data, '$.type') as ptype, 
               json_extract(data, '$.text') as text,
               substr(data, 1, 1000) as preview
        FROM part WHERE message_id=? ORDER BY time_created
    """, (m['id'],)).fetchall()
    print(f"[{m['role']}]")
    for p in parts:
        if p['text']:
            print(f"  TEXT: {p['text'][:800]}")
        else:
            print(f"  PART: {p['preview'][:500]}")
    print()

# === Auto Distill session ===
print("\n=== AUTO DISTILL SESSION ===\n")
SID3 = "ses_0670549e2ffe7RO4YocniW3qZS"
msgs3 = cur.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created, m.agent_id
    FROM message m WHERE m.session_id=? ORDER BY m.time_created
""", (SID3,)).fetchall()

for m in msgs3:
    agent = m['agent_id']
    agent_tag = f" [agent={agent}]" if agent and agent != 'main' else ""
    print(f"[{m['role']}{agent_tag}]")
    parts = cur.execute("""
        SELECT json_extract(data, '$.type') as ptype, 
               json_extract(data, '$.tool') as tool,
               json_extract(data, '$.text') as text,
               json_extract(data, '$.state.output') as output,
               substr(json_extract(data, '$.state.input'), 1, 300) as input_preview
        FROM part WHERE message_id=? ORDER BY time_created
    """, (m['id'],)).fetchall()
    for p in parts:
        if p['ptype'] == 'text' and p['text']:
            print(f"  TEXT: {p['text'][:600]}")
        elif p['ptype'] == 'tool' and p['tool']:
            print(f"  TOOL: {p['tool']}")
            if p['output']:
                out = str(p['output'])[:500].replace('\n', ' ')
                print(f"    OUTPUT: {out}")
    print()

# === Check for task table entries ===
print("\n=== TASK TABLE ===\n")
tasks = cur.execute("SELECT * FROM task WHERE session_id IN (?, ?, ?)", (SID, SID2, SID3)).fetchall()
for t in tasks:
    print(dict(t))
    
print("\n=== TASK_EVENT TABLE ===\n")
events = cur.execute("SELECT * FROM task_event WHERE session_id IN (?, ?, ?)", (SID, SID2, SID3)).fetchall()
for e in events:
    print(dict(e))

conn.close()
