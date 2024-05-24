# Node - With Sequelize Boilerplate

This project was dockerize with docker compose up.

## Create .env

To create a .env file from a .env.example file in the root directory of your project, you can use the following command:

### `cp .env.example .env`

## Available Scripts

In the project directory, you can run:

### `docker compose up`

Runs the app in the development mode.\
Open [http://localhost:9000/](http://localhost:9000/api) to view Swagger Apis in your browser developed for front app.
Open [http://localhost:3000/](http://localhost:3000/api) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Install Packages
npm install

## Create Database Specified by Configurations
npx sequelize db:create