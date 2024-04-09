from invoke.tasks import task


@task
def format(ctx):
    ctx.run("poetry run black . --exclude temp")
    ctx.run("poetry run isort . --profile=black")


@task
def test(ctx):
    ctx.run("poetry run pytest src/tests --color=yes -n auto", pty=True)


@task
def coverage_html(ctx):
    ctx.run("pytest --cov src --cov-report html -n auto", pty=True)


@task
def coverage_xml(ctx):
    ctx.run("pytest --cov src --cov-report xml -n auto", pty=True)


@task
def lint(ctx):
    ctx.run("poetry run pylint src -j 0")


@task
def dev(
    ctx,
):
    ctx.run("poetry run python3 src/app.py")


@task
def start(
    ctx,
):
    ctx.run("poetry run uwsgi --ini wsgi.ini")


@task
def run_image(ctx):
    ctx.run("poetry run python3 src/run_image.py")


@task
def convert_recipe(ctx):
    ctx.run("poetry run spython recipe Dockerfile Singularity")
