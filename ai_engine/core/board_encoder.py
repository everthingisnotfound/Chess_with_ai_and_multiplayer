import chess
import numpy as np

PIECE_TO_VALUE = {
    'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 10
}


def encode_board(fen: str):
    """
    Encodes board into a numeric vector (length 64).
    White pieces are positive, black pieces are negative.
    """
    board = chess.Board(fen)
    encoding = []

    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece is None:
            encoding.append(0)
        else:
            value = PIECE_TO_VALUE[piece.symbol().lower()]
            encoding.append(value if piece.color == chess.WHITE else -value)

    return np.array(encoding)
