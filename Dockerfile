FROM node:lts as node_build

ARG MODE

ENV NODE_ENV="production"

# pnpm installation
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY ./frontend .
RUN pnpm run build

FROM python:3

ENV HOME=/home/user

RUN pip install poetry

WORKDIR /app

COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry install --without dev --no-root --no-directory

COPY ./backend .

RUN adduser --home /home/user user

RUN chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME

COPY --from=node_build /frontend/dist /frontend/dist
RUN chmod -R g=u /frontend/dist

USER 1001
EXPOSE 5000:5000
CMD ["poetry", "run", "invoke", "start"]

