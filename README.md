# Revist Todo List with Sequelize

## Build Steps:

- `npm init --yes`
- `gitignore node`
- `npm i express mustache-express body-parser sequelize pg --s`
- `sequelize init`
- edit config/config.json:
  - username -> "<your username>" (whoami)
  - database -> "<database name>"
  - dialect -> "postgres"
- `createdb <database name>`
- `sequelize db:migrate`
- to create a model:
  - `sequelize model:create --name Todos --attributes 'title:string details:text completed:timestamp'`
  - `sequelize db:migrate` <- update data
- `touch app.js`
- `touch README.md`
- `mkdir views`
- `cd views`
- `touch index.mustache`
- `touch todos.mustache`
- `touch create.mustache`
- `touch delete.mustache`
- `touch update.mustache`
- in app.js:
  -  `const express = require('express'),
        mustacheExpress = require('mustache-express'),
        bodyParser = require('body-parser'),
        sequelize = require('sequelize')
        models = require("./models");

      const app = express();

      app.engine('mustache', mustacheExpress());
      app.set('views', './views');
      app.set('view engine', 'mustache')

      app.use(bodyParser.urlencoded({
          extended: false
      }));

      app.get('/', function(req, res) {
          res.render("index");
      })

      app.listen(3000, function() {
          console.log('Express running on http://localhost:3000/.')
      });

      process.on('SIGINT', function() {
        console.log("\nshutting down");
        const index = require('./models/index')
        index.sequelize.close()

       // give it a second
        setTimeout(function() {
          console.log('process exit');
          process.exit(0);
        }, 1000)
      });`


## Resources:

- Assignment: [Build a todo list](https://newline.theironyard.com/courses/10/projects/76)
- Assignment: [Revisit Todo List with Sequelize](https://newline.theironyard.com/courses/10/projects/111)
- Tutorial: [Scotch.io](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)
- Tutorial: [SequelizeJs](ttp://docs.sequelizejs.com/manual/tutorial/instances.html)

## Features:

- app uses Sequelize to store user todos
- user has the ability to edit and delete individual todos
