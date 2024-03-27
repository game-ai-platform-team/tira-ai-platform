FROM python:3-slim as runtime

RUN adduser --home /home/user user
WORKDIR /home/user

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

RUN apt update
RUN apt install git -y
RUN pip install poetry

ENV HOME=/home/user
ENV VIRTUAL_ENV=/home/user/.venv \
    PATH="/home/user/.venv/bin:$PATH"

COPY ./ .
RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root --no-directory

RUN chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 $HOME \
    && chmod -R g=u $HOME

USER user
CMD ["poetry", "run", "python3", "src/main.py"]

