# Testing

The project has automated unit and E2E tests for back-end and front-end.

Install dependencies according to [admin manual](/docs/admin_manual.md) before running tests.

## Back-end

Run the following commands in `/backend`.

### Unit tests

Run unit tests:

```sh
poetry run invoke test
```

### Coverage report

Generate coverage report (human-readable HTML):

```sh
poetry run invoke coverage-html
```

Coverage report will be outputted to `/backend/htmlcov/index.html`.

Generate coverage (XML for CI/CD):

```sh
poetry run invoke coverage-xml
```

Coverage report will be generated to `/backend/coverage.xml`.

## Front-end

Run the following commands in `/frontend`.

### Unit tests

Run unit tests:

```sh
pnpm run test
```

Generate coverage report (json and HTML):

```sh
pnpm run coverage
```

Coverage report will be outputted to `/frontend/coverage`.
`index.html` is human-readable and `coverage-final.json` is for CI/CD.

### E2E tests

Add `MODE=test` to environment variables when running e2e tests.

Before running E2E tests, build front-end:

```sh
pnpm run build
```

and start back-end:

```sh
pnpm run server
```

Run E2E tests via CLI:

```sh
pnpm run test:E2E
```

Run E2E tests in Cypress app:

```sh
pnpm run cypress:open
```
