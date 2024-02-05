# Testing

Right now, there are 3 types of tests: backend unit and integration tests, frontend unit and integration tests and end-to-end tests.

## Backend

First, you need to go into backend folder and install dependencies.
To test backend, run `pytest`.
To make a test coverage report, run `coverage run --branch -m pytest` and then `coverage html`.

## Frontend

First, you need to go into frontend folder and install dependencies.
To run frontend tests, run `npm test`



## End-to-end
First, make sure the backend is running with built frontend.
Then, you can run `npm run test:e2e` in frontend-directory. 

