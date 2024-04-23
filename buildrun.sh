git pull --rebase --autostash

cd frontend
pnpm run build

cd ../backend
poetry install

pkill uwsgi
poetry run invoke start