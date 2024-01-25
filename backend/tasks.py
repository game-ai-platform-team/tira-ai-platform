from invoke.tasks import task


@task
def format(ctx):
    ctx.run("poetry run black . --exclude temp")
    ctx.run("poetry run isort . --profile=black")


@task
def test(ctx):
    ctx.run("poetry run coverage run --branch -m pytest src/tests")


@task
def lint(ctx):
    ctx.run("poetry run pylint src --fail-under=8")
