import sqlite3
import json
import sys
import time

DB_PATH = 'C:/Users/manoj/.local/share/mimocode/mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# 30 days cutoff in ms
cutoff_ms = int((time.time() - 30*24*3600) * 1000)

# 1. Sessions for this project
cur.execute("SELECT id, title, directory, time_created, time_updated FROM session WHERE project_id = 'cf1c4019-c470-4cf2-a50d-52334ed3c0dc' ORDER BY time_created DESC")
print("=== SESSIONS FOR THIS PROJECT ===")
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"  {r['id']} | {tc} | {r['title']}")

# 2. All recent sessions (last 30 days)
cur.execute("SELECT id, title, directory, project_id, time_created FROM session WHERE time_created > ? ORDER BY time_created DESC", (cutoff_ms,))
print(f"\n=== ALL RECENT SESSIONS (since {time.strftime('%Y-%m-%d', time.localtime(cutoff_ms/1000))}) ===")
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    proj = r['project_id'] or 'none'
    print(f"  {r['id']} | {tc} | proj:{proj[:8]}... | {r['title']}")

# 3. Recent sessions that had this workspace
cur.execute("SELECT id, title, directory, project_id, time_created FROM session WHERE directory LIKE '%capsule%' OR directory LIKE '%manoj%' ORDER BY time_created DESC")
print(f"\n=== SESSIONS IN RELEVANT DIRECTORIES ===")
for r in cur.fetchall():
    tc = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created']/1000))
    print(f"  {r['id']} | {tc} | {r['directory']} | {r['title']}")

conn.close()
