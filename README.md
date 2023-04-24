## Introduction

A full stack demo application made using the MERN stack (MongoDB, Express, React & Nodejs)

## Technologies used

This project was created using the following technologies.

#### Client

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI & CSS Module (for User Interface)
- React simple Snackbar (To display success/error notifications)

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)

#### Database

MongoDB (MongoDB Atlas)

## Key Features
- Login signup with your role Customer/Admin
- Guests (Customer) can create/update/cancel their reservations
- Restaurant employees (Admin) can create/update/cancel all reservations
- List Table Reservations
- Reservation details
## ToDo
- Guests can only pickup future date ()
- Guests can't change if reservation cancelled or overdue
- Add CronJob auto update reservation overdue
- Add Store/Hotel field

## Configuration and Setup

In the first terminal:
```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
In the second terminal:
```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```
## Docker

Using docker is simple. Just add the .env contextualized with the docker network.

e.g:

> goes to path "server/.env"

```
DB_URL = mongodb://mongo:27017/arch
PORT = 5000
SECRET =
SMTP_HOST =
SMTP_PORT =
SMTP_USER =
SMTP_PASS =
```

> goes to path "client/.env"

```
REACT_APP_API = http://localhost:5000
REACT_APP_URL = http://localhost
```

And run

```
docker-compose -f docker-compose.prod.yml build

And then

docker-compose -f docker-compose.prod.yml up
```

### Unit Test
Here I only created one unit test for demo

> client/src/components/NavBar/NavBar.test.js

Run
- npm test
