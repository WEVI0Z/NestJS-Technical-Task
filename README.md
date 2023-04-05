# Description

NestJS-Technical-Task documentation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database
### step 1: create .env file
### step 2: create database constants
```bash
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_PORT=
DATABASE_HOST=
```
example for the database in the docker-compose.yml file:
```bash
DATABASE_USER=postgres
DATABASE_PASSWORD=pass123
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
```
to create the database for e2e test use
```bash
docker-compose up test
```

### step 3:
```bash
docker-compose up
```

## Swagger

The address of the swagger is web-site-url/api 
