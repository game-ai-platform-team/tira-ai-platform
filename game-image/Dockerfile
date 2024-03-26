FROM python:3-slim as runtime

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

RUN apt update
RUN apt install git -y
RUN pip install poetry

WORKDIR /app

COPY ./ .
RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root --no-directory

ENV HOME=/home/user
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

RUN adduser --home /home/user user

RUN chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME

USER 1001
EXPOSE 5000:5000
CMD ["poetry", "run", "python3", "src/main.py"]

