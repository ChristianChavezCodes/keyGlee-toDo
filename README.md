# Take Home Interview Assignment

## Table Of Contents

1. [Pre Requisites](#pre-requisites)
2. [Installation](#installation)

## Pre-Requisites

You will need to ensure you have a couple things installed to be able to test your code locally

- Go - [Go docs](https://go.dev/doc/)
- Node - [Node Homepage](https://nodejs.org/en)
  - There are plenty of different ways to install node, you should have at least version 16
  - This project will use `npm` for installing packages
- Docker - [Docker Installation](https://docs.docker.com/engine/install/)

# Testing locally

After successfully installing the previous pre-requisites, run the docker compose command from within the `backend` directory to spin up a local version of the api.
```
docker compose up
```

This will spin up the backend for the Postgres and the API that you can hit from your frontend app.

## Frontend

Within the `todo-demo` directory, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `todo-demo/app/page.tsx`. The page auto-updates as you edit the file.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Backend API

Base URL is `http://localhost:4000`

### 1. Get Todo
- **Endpoint**: `/todo/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific Todo record by its ID.
- **Request Parameters**:
  - `id` (path parameter, required): The ID of the Todo record.
- **Response**:
  - `200 OK`: Returns the Todo record.
  - `400 Bad Request`: Invalid request.
  - `404 Not Found`: Todo record not found.
  - `500 Internal Server Error`: An error occurred while retrieving the Todo record.

### 2. Search Todos
- **Endpoint**: `/todo`
- **Method**: `GET`
- **Description**: Search for Todo records based on optional parameters.
- **Request Parameters**:
  - `id` (query parameter, optional): The ID of the Todo record.
  - `display_name` (query parameter, optional): The display name of the Todo record.
- **Response**:
  - `200 OK`: Returns a list of Todo recprds matching the search criteria.
  - `400 Bad Request`: Invalid request.
  - `500 Internal Server Error`: An error occurred while searching for Todo records.

### 3. Create Todo
- **Endpoint**: `/todo`
- **Method**: `POST`
- **Description**: Create a new Todo record.
- **Request Body**:
  - `display_name` (JSON field, string, optional): The display name of the Todo record.
  - `due_by` (JSON field, string, optional): The due by date of the Todo record in ISO 8601 format
- **Response**:
  - `200 OK`: Todo record created successfully.
  - `400 Bad Request`: Invalid request.
  - `500 Internal Server Error`: An error occurred while creating the Todo record.

### 4. Update Todo
- **Endpoint**: `/todo/:id`
- **Method**: `PUT`
- **Description**: Retrieve a specific Todo record by its ID and update its attributes according to the Request Body.
- **Request Parameters**:
  - `id` (path parameter, required): The ID of the Todo record.
- **Request Body**:
  - `display_name` (JSON field, string, optional): The display name of the TODO record.
  - `due_by` (JSON field, string, optional): A timestamp field in ISO 8601 format.
- **Response**:
  - `200 OK`: Returns the updated Todo record.
  - `400 Bad Request`: Invalid request.
  - `404 Not Found`: Todo record not found.
  - `500 Internal Server Error`: An error occurred while retrieving the Todo record.

### 5. Delete Todo
- **Endpoint**: `/todo/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific Todo record from the database with the given ID.
- **Request Parameters**:
  - `id` (path parameter, required): The ID of the Todo record.
- **Response**:
  - `200 OK`: Returns a successful message response as a string.
  - `400 Bad Request`: Invalid request.
  - `404 Not Found`: Todo not found.
  - `500 Internal Server Error`: An error occurred while retrieving the Todo record.

### Example Usage

The following examples are for use with CURL, however if unfamiliar already try using Postman for easier local troubleshooting.

#### Get Todo
```sh
curl -X GET http://localhost:4000/todo/1
```

#### Search Todos
```sh
curl -X GET "http://localhost:4000/todo?id=1&display_name=Buy%20Milk"
```

#### Create Todo
```sh
curl -X POST http://localhost:4000/todo -H "Content-Type: application/json" -d '{
  "display_name": "Buy Milk"
}'
```

#### Update Todo
```sh
curl -X PUT http://localhost:4000/todo/1 -H "Content-Type: application/json" -d '{
  "display_name": "Buy Groceries",
  "due_by": "2025-12-31T12:00:00Z"
}'
```

#### Delete Todo
```sh
curl -X DELETE http://localhost:4000/todo/1
```