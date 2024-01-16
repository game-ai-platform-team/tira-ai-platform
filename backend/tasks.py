from invoke.tasks import task


@task
def format(ctx):
    ctx.run("poetry run black .")
    ctx.run("poetry run isort .")
