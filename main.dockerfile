FROM ubuntu:latest

RUN apt-get update -y && apt-get install -y python3 python3-pip
RUN python3 -m pip install poetry


COPY ./backend ./backend
WORKDIR backend

RUN python3 -m poetry install

CMD ["poetry", "run", "python3", "src/main.py"]