from learning.move_logger import log_user_move
from learning.learner import get_learned_bias

fen = "test_position"
log_user_move(fen, "e2e4")
log_user_move(fen, "e2e4")
log_user_move(fen, "d2d4")

print(get_learned_bias(fen))
