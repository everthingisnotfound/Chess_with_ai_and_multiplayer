from learning.memory_db import get_connection, init_db


def log_user_move(fen: str, move: str, weight: float = 0.1):
    """
    Stores a user move with a small positive weight.
    """
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO move_memory (fen, user_move, weight)
        VALUES (?, ?, ?)
    """, (fen, move, weight))

    conn.commit()
    conn.close()
