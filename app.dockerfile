FROM node:latest as node_build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build



FROM ubuntu:latest as backend

RUN apt-get update -y && apt-get install -y python3 python3-pip
RUN python3 -m pip install poetry

COPY --from=node_build /frontend/dist /frontend/dist

COPY ./backend ./app
WORKDIR /app


RUN python3 -m poetry install

EXPOSE 5000
CMD ["poetry", "run", "python3", "src/app.py"]
