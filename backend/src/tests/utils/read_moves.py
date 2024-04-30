from tests.config import TEST_DATA_DIR


def read_moves(game: str) -> list[list[str]]:
    moves = []

    with open(
        TEST_DATA_DIR / f"sample_{game}_moves.txt", mode="r", encoding="utf-8"
    ) as file:
        moves = file.readlines()

    return [moves[:5], moves[5:10], moves[10:]]
