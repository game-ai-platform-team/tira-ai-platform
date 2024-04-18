from pathlib import Path

from invoke.tasks import task

SOURCE_DIR = Path(__file__).parent / "src"


@task
def run(ctx):
    ctx.run(f"poetry run python3 {SOURCE_DIR}/run_image.py")
