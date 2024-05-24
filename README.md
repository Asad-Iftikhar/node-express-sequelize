# node-express-sequelize-boilerplate

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

This is a simple boilerplate for building REST APIs in Node.js using Express. Intended for use with MySQL using Sequelize ORM, [Official Sequelize Documentation](https://sequelize.org/docs/v6/).

## Getting Started

Clone the repository

```bash
git clone https://github.com/Asad-Iftikhar/node-express-sequelize.git
```

Enter into the directory

```bash
cd node-express-sequelize/
```

### create .env

To create a .env file from a .env.example file in the root directory of your project, you can use the following command

```bash
cp .env.example .env
```

### Install Packages

Install the dependencies

```bash
npm install
```

## Commands for sequelize-cli

visit the [documentation](https://sequelize.org/docs/v6/other-topics/migrations/)

### Create an empty project you will need to execute init command, but for this project just skip this one

```bash
npx sequelize-cli init
```

This will create following folders

- config, contains config file, which tells CLI how to connect with database
- models, contains all models for your project
- migrations, contains all migration files
- seeders, contains all seed files

```bash
# List Available Commands
npx sequelize-cli list

# Creates the database
npx sequelize-cli db:create

# Create Model file inside models with migration file inside migrations folder :: Example
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string

# Drops the database
npx sequelize-cli db:drop

# Load migrations
npx sequelize-cli db:migrate

# Undo migrations
npx sequelize-cli db:migrate:undo:all

# Create Seeder file inside seeders folder :: Example
npx sequelize-cli seed:generate --name default-user

# Load seeders
npx sequelize-cli db:seed:all
```

## Running the Project

```bash
npm run dev
```
