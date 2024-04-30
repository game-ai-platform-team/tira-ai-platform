from pathlib import Path

from invoke.tasks import task

ROOT_DIR = Path(__file__).parent
SOURCE_DIR = ROOT_DIR / "src"


@task
def format(ctx):
    ctx.run(f"poetry run black {ROOT_DIR} --exclude temp")
    ctx.run(f"poetry run isort {ROOT_DIR} --profile=black")


@task
def test(ctx):
    ctx.run(f"poetry run pytest {SOURCE_DIR} --color=yes -n auto", pty=True)


@task
def coverage_html(ctx):
    ctx.run(f"pytest {SOURCE_DIR} --cov  --cov-report html -n auto", pty=True)


@task
def coverage_xml(ctx):
    ctx.run(f"pytest {SOURCE_DIR} --cov --cov-report xml -n auto", pty=True)


@task
def lint(ctx):
    ctx.run(f"poetry run pylint {SOURCE_DIR} -j 0")


@task
def dev(
    ctx,
):
    ctx.run("MODE=development poetry run dotenv --file .env.$MODE run uwsgi")


@task
def start(
    ctx,
):
    ctx.run("poetry run dotenv --file .env.${MODE:=production} run uwsgi")
