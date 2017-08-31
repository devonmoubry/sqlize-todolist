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

app.post("/todos", function(req, res) {
  console.log("req.body", req.body);
  const todo = models.Todos.build({
    title: req.body.todoTitle,
    description: req.body.todoDetails
  });
  todo
    .save()
    .then(function() {
      res.redirect("/todos");
    })
    .catch(function(err) {
      res.render("todos", { errors: err });
    });
});

app.post("/todos/:id/destroy", function(req, res) {
  models.Todos
    .destroy({
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(function() {
      res.redirect("/todos");
    });
});

app.post("/todos/:id/complete", function(req, res) {
  var rightNow = new Date();

  models.Todos.findById(req.params.id).then(function(todo) {
    todo.update({ completed: rightNow }).then(function() {
      res.send("ok");
    });
  });
});

app.post("/todos/:id/undoComplete", function(req, res) {
  models.Todos.findById(req.params.id).then(function(todo) {
    todo.update({ completed: null }).then(function() {
      res.send("ok");
    });
  });
});

app.get("/todos/:id/updatepage", function (req, res) {
  models.Todos.findById(req.params.id).then(function (todo) {
    console.log();
    res.render('update', {todo: todo});
  })
})

app.post("/todos/:id/update", function (req, res) {
  models.Todos.findById(req.params.id).then(function (todo) {
    todo.update({
      title: req.body.todoTitle,
      details: req.body.todoDetails
    }).then(function () {
      res.redirect("/todos")
    })
  })
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
