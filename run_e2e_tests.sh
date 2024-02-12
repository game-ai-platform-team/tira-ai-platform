#!/bin/bash

cd frontend

npm run build

cd ..

cd backend

poetry run python3 src/app.py &

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5000/ping)" != "200" ]];
  do sleep 1;
done

cd ..

cd frontend

npm run test:e2e

status=$?

cd ..

kill $(lsof -t -i:5000)

exit $status
