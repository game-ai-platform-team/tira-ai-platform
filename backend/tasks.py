import pty

from invoke.tasks import task


@task
def format(ctx):
    ctx.run("poetry run black . --exclude temp")
    ctx.run("poetry run isort . --profile=black")


@task
def test(ctx):
    ctx.run("poetry run pytest src/tests", pty=True)


@task
def coverage_html(ctx):
    ctx.run("coverage run --branch -m pytest src && coverage html", pty=True)


@task
def coverage_xml(ctx):
    ctx.run("coverage run --branch -m pytest src && coverage xml", pty=True)


@task
def lint(ctx):
    ctx.run("poetry run pylint src --fail-under=8")
