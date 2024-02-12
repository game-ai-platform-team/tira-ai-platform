#!/bin/bash

poetry run python3 backend/src/app.py &

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5000/ping)" != "200" ]];
  do sleep 1;
done

cd frontend

npm run test:e2e

status=$?

cd ..

kill $(lsof -t -i:5000)

exit $status
