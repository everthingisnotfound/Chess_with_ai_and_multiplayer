from core.ai_player import choose_move
from learning.learner import get_learned_bias

fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

if move in learned_bias:
    score += learned_bias[move] * difficulty_factor

print("Easy:", choose_move(fen, "easy"))
print("Medium:", choose_move(fen, "medium"))
print("Hard:", choose_move(fen, "hard"))
