from learning.memory_db import get_connection, init_db


def get_learned_bias(fen: str):
    """
    Returns a dict: { move: accumulated_weight }
    """
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT user_move, SUM(weight)
        FROM move_memory
        WHERE fen = ?
        GROUP BY user_move
    """, (fen,))

    data = cursor.fetchall()
    conn.close()

    return {move: weight for move, weight in data}
