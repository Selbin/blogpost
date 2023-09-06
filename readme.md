# Blog post

Backend for Blogging platform with authentication and features such as create, read, update and delete posts.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Reference](#api-reference)

## Installation

### Normal setup

Setup the .env. Have kept the env variables for ease of testing. Update mongoDB uri to match the docker/normal setup requirement

To install the dependencies, run the following command:

```
npm install
```

To run the project in development environment (handles build automatically), use the following command:

```
npm run dev
```

To build the project, use the following command:

```
npm run build
```

To run the project, use the following command:

```
npm start
```

To run tests, use the following command:

```
npm run build
npm test
```

### Docker setup

Install docker in your system. To run docker container, use the following command:

```
docker-compose up
```

## Usage

Use [Postman](https://documenter.getpostman.com/view/10076231/2s9YBxXvWE) to trigger API calls.

1. Call `POST /author/register` to create an author.
2. Call `POST /author/login` to login, which returns a token.
3. Use the token as a bearer token for creation, updation, and deletion.
    1. `POST /api/posts` for creating a blog post.
    2. `PUT /api/posts/:id` for updating a blog post.
    3. `DELETE /api/posts/:id` for deleting a blog post.
4. `GET /api/posts` for getting all blog posts. `page` and `pageSize` can be passed as query params for pagination.
5. `GET /api/posts/:id` for getting a post by id.

## API Reference

[API documentation with Postman](https://documenter.getpostman.com/view/10076231/2s9YBxXvWE)

## Technology choices

1. Used Winston for logging error, infos and warnings to a file and to console
2. Used Mongoose for defining schemas which helps with data validation and organization
3. Used helmet to strengthen CSP to avoid XSS
4. Used bcrypt to hash the password
5. Used JWT authentication for protecting routes
6. Used JOI for validation for providing a layer of protection over database validation.
