import chess
def get_legal_moves(fen: str):
    board = chess.Board(fen)
    return list(board.legal_moves)