# ECE Web Technologies Course Lab 3

Welcome to our lab 3 for the ECE Web Technologies Course! This README will guide you through the setup, installation, and basic usage of our lab. We've worked diligently to provide a smooth and intuitive experience.

## Table of Contents

1. [Installation](#installation)
2. [Execution](#execution)
3. [Endpoints](#endpoints)
   - [Articles](#articles)
   - [Comments](#comments)
4. [Mock Database](#mock-database)
5. [Known Issues](#known-issues)
6. [Contributions](#contributions)

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository.
3. Navigate to the project directory via command line and run `npm install` to install the necessary dependencies.

## Execution

1. Within the project directory, run `node index.js` to start the server.
2. The server will start at `http://localhost:8080`.

## Endpoints

### Articles

- `GET /articles`: Retrieve a list of all articles.
- `POST /articles`: Add a new article. The request body should contain `title`, `content`, and `author`.
- `GET /articles/:articleId`: Retrieve a specific article by its ID.

### Comments

- `GET /articles/:articleId/comments`: Retrieve all comments for a specific article.
- `POST /articles/:articleId/comments`: Add a new comment to a specific article. The request body should contain `content` and `author`.
- `GET /articles/:articleId/comments/:commentId`: Retrieve a specific comment from a specific article.

## Mock Database

The database is simply a JavaScript object exported from `db.js`. You can add, delete, or modify articles and comments directly in this file for testing purposes.

## Known Issues

- The mock database is in-memory, so data will reset upon every server restart.

## Contributions

This lab is the production of Gabriel, Tanguy, and Mathéo for the ECE Web Technologies Course. We hope you enjoy our lab! 
