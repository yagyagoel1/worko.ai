# worko.ai



## Introduction

Welcome to our project! This is a robust API built with Node.js and Express, featuring various middleware and tools like Docker, Prometheus, helmet, rate limiting, cookie parsing, and more. This introduction will give you an overview of the technologies and features incorporated into our project.

---

### Key Technologies and Features

- **Express:** Our API is built on top of Express.js, a fast and minimalist web framework for Node.js. Express provides robust routing, middleware support, and enables rapid development of scalable APIs.

- **Prometheus:** We use Prometheus for monitoring and alerting. It collects metrics from our application and infrastructure, allowing us to gain insights into performance, resource usage, and more.

- **Middleware:**
  - **Helmet:** Helmet helps secure our Express app by setting various HTTP headers to protect against common web vulnerabilities.
  - **Rate Limiting:** We implement rate limiting using middleware to prevent abuse and ensure fair usage of our API resources.
  - **Cookie Parser:** The cookie-parser middleware parses cookies attached to the client's request, facilitating session management and authentication.
  - **Middleware Chaining:** We chain middleware functions to handle various aspects of request processing, such as authentication, logging, error handling, etc.

- **Docker:** Docker simplifies our development and deployment workflow by encapsulating our application and its dependencies into lightweight containers. This ensures consistency and portability across different environments.

- **Environment Variables:** We utilize environment variables to configure our application dynamically, enabling us to easily switch between development, staging, and production environments.

---

With these technologies and features, our project aims to deliver a reliable, scalable, and secure API solution. We welcome you to explore the codebase, contribute to its enhancement, and leverage the power of modern web development tools.
## Getting Started

This guide will help you set up and run the project using Docker Compose. Follow the steps below to get started.

## Prerequisites

Ensure you have the following installed on your machine:

- Docker
- node

## Installation

### Without Docker

```
1. Clone the Repository:
2. git clone https://github.com/yagyagoel1/worko.ai
3. cd worko.ai
4. Create a `.env` File
Copy the sample environment file and customize it according to your setup.
5. Run npm install
6. Run npm start
```

### With Docker

```
1. Clone the Repository:
2. git clone https://github.com/yagyagoel1/worko.ai
3. cd worko.ai
4. Create a `.env` File
Copy the sample environment file and customize it according to your setup.
5.  Run sudo docker compose up
```

 **Access the Application:**

- The application will be available at `http://localhost:8000`.
- Prometheus will be available at `http://localhost:9090`.


### Running Tests

The project uses `vitest` and `supertest` for testing. Follow the steps below to run the tests:

1. **Run npm test after making sure the mongodb url and other env are working**


### Routes

The following routes are available in the application:

- User Routes
  - Register User: `POST /worko/user/register`
  - Login User: `POST /worko/user/login`
  - Get All Users: `GET /worko/user`
  - Get User by ID: `GET /worko/user/id/:userId`
  - Update User by ID: `PUT /worko/user/id/:userId`
  - Partially Update User by ID: `PATCH /worko/user/id/:userId`
  - Delete User by ID: `DELETE /worko/user/id/:userId`
  - Change Password: `PATCH /worko/user/changepassword`
  - Logout User: `POST /worko/user/logout`

- Metrics Route
  - Get Metrics: `GET /metrics`

### Authentication

Authentication is handled using JWT (JSON Web Tokens). Upon successful login, a JWT token is generated and set as a cookie. This token is used for authenticating protected routes.

**Middleware:**

- `verifyUser`: This middleware checks for the presence of a valid JWT token in the request cookies.

### Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. Ensure all tests pass and adhere to the project's coding standards.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---




 

