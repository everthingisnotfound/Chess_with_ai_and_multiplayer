import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "memory.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS move_memory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fen TEXT NOT NULL,
            user_move TEXT NOT NULL,
            weight REAL DEFAULT 0.0
        )
    """)

    conn.commit()
    conn.close()
