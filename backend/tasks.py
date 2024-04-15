from pathlib import Path

from invoke.tasks import task

SOURCE_DIR = Path(__file__).parent / "src"


@task
def format(ctx):
    ctx.run(f"poetry run black {SOURCE_DIR} --exclude temp")
    ctx.run(f"poetry run isort {SOURCE_DIR} --profile=black")


@task
def test(ctx):
    ctx.run(f"poetry run pytest {SOURCE_DIR} --color=yes -n auto", pty=True)


@task
def coverage_html(ctx):
    ctx.run(f"pytest --cov {SOURCE_DIR} --cov-report html -n auto", pty=True)


@task
def coverage_xml(ctx):
    ctx.run(f"pytest --cov {SOURCE_DIR} --cov-report xml -n auto", pty=True)


@task
def lint(ctx):
    ctx.run(f"poetry run pylint {SOURCE_DIR} -j 0")


@task
def dev(
    ctx,
):
    ctx.run(f"poetry run python3 {SOURCE_DIR}/app.py")


@task
def start(
    ctx,
):
    ctx.run("poetry run uwsgi --ini wsgi.ini")


@task
def run_image(ctx):
    ctx.run(f"poetry run python3 {SOURCE_DIR}/run_image.py")
