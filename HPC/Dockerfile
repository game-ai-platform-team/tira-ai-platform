# Install backend dependencies
FROM python:3 as backend

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

RUN pip install poetry

WORKDIR /app

COPY ./pyproject.toml ./poetry.lock ./
RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root --no-directory

# Configure runtime
FROM python:3-slim as runtime

ARG REPOSITORY_URL
ARG GAME
ARG GAME_ID
ARG DIFFICULTY

ENV HOME=/home/user
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
    GAME=${GAME} \
    REPOSITORY_PATH=/app/temp/${GAME_ID} \
    DIFFICULTY=${DIFFICULTY}


COPY --from=backend ${VIRTUAL_ENV} ${VIRTUAL_ENV}

WORKDIR /app


COPY ./ .
RUN adduser --home /home/user user

RUN chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME

USER 1001

CMD ["poetry", "run", "invoke", "run"]
