# My Hexagonal NestJS Project

This is a NestJS project structured using hexagonal architecture. It uses MongoDB to store user documents and Axios to make HTTP requests. The project also includes Docker and Docker Compose configurations for easy setup and deployment.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Using Docker](#using-docker)
- [Using Docker Compose](#using-docker-compose)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sallesricardo/register-nest-mongodb.git
cd register-nest-mongodb
```

2. Install the dependencies:

```bash
npm install
```
or
```bash
yarn
```
or
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```dotenv
PORT=3000

MONGODB_DEFAULT_ROOT=root
MONGODB_DEFAULT_PASSWORD=123456
MONGODB_APP_USER=app
MONGODB_APP_PASSWORD=123456
MONGODB_HOST=mongodb
MONGODB_PORT=27017
MONGODB_DATABASE=customer

LOCATION_API_URL=https://viacep.com.br/ws/{zipcode}/json/
```
If  you want to use [mongodb-express](https://github.com/mongo-express/mongo-express)  to admin the MongoDB from the docker compose, add this lines:

```dotenv
MONGO_EXPRESS_ROOT=admin
MONGO_EXPRESS_PASSWORD=1234
```

## Project Structure

```plaintext
src/
|-- adapters/
|   |-- mongodb/
|       |-- user.repository.ts
|       |-- user.schema.ts
|   |-- viacepApi/
|       |-- location.repository.ts
|       |-- location.schema.ts
|-- core/
|   |-- domain/
|       |-- location.entity.ts
|       |-- user.entity.ts
|   |-- use-cases/
|       |-- create-user.use-case.ts
|       |-- find-all-users.use-case.ts
|       |-- find-user.use-case.ts
|-- modules/
|   |-- app.module.ts
|   |-- user.module.ts
|-- ports/
|   |-- location/
|       |-- location.repository.ts
|   |-- user/
|       |-- user.controller.ts
|       |-- user-repository.ts
|-- app.controller.ts
|-- app.service.ts
|-- main.ts
```

## Running the Application

### Using npm or yarn or pnpm

1. Start the MongoDB server:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

2. Run the application:

```bash
npm run start
```
or
```bash
yarn start
```
or
```bash
pnpm start
```

The application will be available at `http://localhost:3000`.

## Using Docker

### Building the Docker Image

Build the Docker image for the application:

```bash
docker build -t register-nest-mongodb-project .
```

### Running the Docker Container

Run the Docker container:

```bash
docker run -d -p 3000:3000 --name register-nest-mongodb-project --link mongodb:mongo register-nest-mongodb-project
```

The application will be available at `http://localhost:3000`.

## Using Docker Compose

1. The file `docker-compose.yml` is already configured in the repository with the project, MongoDB, and mongodb-express.

2. Start the services:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`.

## Endpoints

### Users

- `POST /users`: Create a new user
  - Request body:
    ```json
    {
        "name": "John",
        "cpf": "123.456.789-00",
        "email": "john@domain.com",
        "phone": "11999991234",
        "birth": "1970-01-01", // YYYY-MM-DD
        "zipcode": "01001-000"
    }
    ```

- `GET /users`: Get all users

### External Data

- `GET /external-data`: Fetch external data

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
