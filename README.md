# Checkout Nestjs API

This project contains a simple base project using Nest.js and the resource to handle an e-commerce checkout. For this project are used a MySQL DB so in the docker-compose file you'll see that it handle the containers and it needs to create a .env file with the vars used.

How does it works 🔍

- You can see on checkout.controller.ts all base routes, and the mainly resource used in this project is the validation on classes and DTOs
- You can see that on the checkout.entity using the typeORM and the create-checkout.dto.ts
- The DTO uses the class-validator and the class-transformer (libs used to handle the body received before it arrives on the module controller, handle the body received).

### Tools 🛠️

🌐 [Nest.js](https://nestjs.com/)

🌐 [@nestjs/class-validator](https://www.npmjs.com/package/@nestjs/class-validator/v/0.13.1)

🌐 [class-transformer](https://www.npmjs.com/package/class-transformer)

🌐 [typeorm](https://docs.nestjs.com/recipes/sql-typeorm)


---

## Setup 🏗️

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

<aside>
💡 This project uses Docker and Docker-compose to setup the DB and the application. The databse used is MySQL
</aside>

## Create and run the environment

```bash
docker-compose up
```


## On the app

### Installation

```
$ npm install
```

### Running the app

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

### Test

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```
