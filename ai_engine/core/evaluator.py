import chess

PIECE_VALUES = {
    chess.PAWN: 1,
    chess.KNIGHT: 3,
    chess.BISHOP: 3.2,
    chess.ROOK: 5,
    chess.QUEEN: 9,
    chess.KING: 1000,
}

CENTER_SQUARES = {
    chess.E4, chess.D4,
    chess.E5, chess.D5
}


def evaluate_move(board: chess.Board, move: chess.Move) -> float:
    """
    Returns a heuristic score for a move.
    Higher is better.
    """
    score = 0.0

    # Capture value
    if board.is_capture(move):
        captured_piece = board.piece_at(move.to_square)
        if captured_piece:
            score += PIECE_VALUES[captured_piece.piece_type]

    board.push(move)

    # Center control
    if move.to_square in CENTER_SQUARES:
        score += 0.3

    # Development bonus
    piece = board.piece_at(move.to_square)
    if piece and piece.piece_type in (chess.KNIGHT, chess.BISHOP):
        score += 0.2

    # King safety
    if board.is_castling(move):
        score += 0.4

    # Penalize hanging pieces
    if board.is_attacked_by(not board.turn, move.to_square):
        score -= 0.5

    board.pop()
    return score
