const express = require("express"),
  mustacheExpress = require("mustache-express"),
  bodyParser = require("body-parser"),
  models = require("./models");

const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/todos", function(req, res) {
  models.Todos.findAll().then(function(todos) {
    res.render("todos", { todos: todos });
  });
});

})

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});

process.on("SIGINT", function() {
  console.log("\nshutting down");
  const index = require("./models/index");
  index.sequelize.close();

  // give it a second
  setTimeout(function() {
    console.log("process exit");
    process.exit(0);
  }, 1000);
});
