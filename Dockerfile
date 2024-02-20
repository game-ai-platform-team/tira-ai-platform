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

COPY --from=node_build /frontend/dist /frontend/dist

COPY ./backend ./app
WORKDIR /app

RUN adduser --home /home/user user

RUN mkdir -p $HOME/.cache/pypoetry/virtualenvs/ \
    && mkdir -p $HOME/.config/pypoetry \
    && chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME \
    && chmod -R g=u /frontend/dist

RUN python3 -m poetry install --without dev --no-root --no-directory
RUN ls -la $HOME/.config/pypoetry

USER 1001
EXPOSE 5000:5000
CMD ["poetry", "run", "invoke", "start"]
