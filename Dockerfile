FROM node:latest as node_build

ARG MODE

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install --omit=dev
COPY ./frontend .
RUN npm run build

FROM ubuntu:latest as backend

RUN apt-get update -y && apt-get install -y python3 python3-pip
RUN python3 -m pip install poetry
RUN poetry config virtualenvs.create false

COPY --from=node_build /frontend/dist /frontend/dist

COPY ./backend ./app
WORKDIR /app

RUN adduser --home /home/user user

ENV HOME=/home/user
RUN mkdir -p $HOME/.cache/pypoetry/virtualenvs/ \
    && mkdir -p $HOME/.config/pypoetry \
    && chown -R user:user $HOME \
    && chmod -R 755 $HOME \
    && chgrp -R 0 /app \
    && chmod -R g=u /app \
    && chgrp -R 0 /$HOME \
    && chmod -R g=u /$HOME \
    && chmod -R g=u /frontend/dist

RUN python3 -m poetry install --without dev
RUN ls -la $HOME/.config/pypoetry
         
USER 1001
EXPOSE 5000:5000
CMD ["poetry", "run", "python3", "src/app.py"]
