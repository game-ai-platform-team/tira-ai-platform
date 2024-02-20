# Generate front-end files
FROM node:lts as node_build

ARG MODE

ENV NODE_ENV="production"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY ./frontend .
RUN pnpm run build

# Install backend dependencies
FROM python:3 as backend

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

RUN pip install poetry

WORKDIR /app

COPY backend/pyproject.toml backend/poetry.lock ./
RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root --no-directory

# Configure runtime
FROM python:3-slim as runtime

ENV HOME=/home/user
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

COPY --from=backend ${VIRTUAL_ENV} ${VIRTUAL_ENV}
COPY --from=node_build /frontend/dist /frontend/dist

WORKDIR /app

COPY ./backend .
RUN adduser --home /home/user user

RUN chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME \
    && chmod -R g=u /frontend/dist

USER 1001
EXPOSE 5000:5000
CMD ["python3", "src/app.py"]

