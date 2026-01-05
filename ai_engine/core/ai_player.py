import random
import chess

from core.move_generator import get_legal_moves
from core.evaluator import evaluate_move


def choose_move(fen: str, difficulty: str = "medium") -> str:
    """
    Returns the chosen move in UCI format.
    difficulty: easy | medium | hard
    """
    board = chess.Board(fen)
    legal_moves = get_legal_moves(fen)

    scored_moves = []

    for move in legal_moves:
        score = evaluate_move(board, move)

        # Difficulty-based randomness
        if difficulty == "easy":
            score += random.uniform(-0.6, 0.6)
        elif difficulty == "medium":
            score += random.uniform(-0.3, 0.3)
        else:  # hard
            score += random.uniform(-0.05, 0.05)

        scored_moves.append((move, score))

    scored_moves.sort(key=lambda x: x[1], reverse=True)

    # Difficulty-based selection
    if difficulty == "easy":
        chosen = random.choice(scored_moves[:8])
    elif difficulty == "medium":
        chosen = random.choice(scored_moves[:4])
    else:
        chosen = scored_moves[0]

    return chosen[0].uci()
