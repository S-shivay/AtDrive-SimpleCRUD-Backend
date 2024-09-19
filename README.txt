# Node.js Backend CRUD Application

This is a Node.js backend for a CRUD application. The backend handles authentication (using JWT) and manages products (with MongoDB) and user data (with MySQL).

## Prerequisites

Before setting up the backend, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/) (v12.x or higher)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Installation

### 1. Clone the repository

Clone this repository to your local machine using Git or download it as a ZIP file.

### 2. Go to the project directory by command cd project-directory.

### 3. Run command npm install under the project directory.

### 4. add the file by the name of (.env) into the project and paste these lines.
        PORT=3000
DB_CONNECT=mongodb+srv://sarang:sarang123@cluster0.9nwh8bg.mongodb.net/atdrive?retryWrites=true&w=majority
TOKEN_SECRET=secret
MYSQL_HOST=bhk05n30lq6bj6lcln30-mysql.services.clever-cloud.com
MYSQL_USER=uxscqabdavupz5ty
MYSQL_PASSWORD=K9NDWH4IunwZ2hAIau2j
MYSQL_DATABASE=bhk05n30lq6bj6lcln30


### 5. Run the app by npm run dev
