const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const Datastore = require("nedb");

var todos = new Datastore({ filename: "todos.db", autoload: true });

app.use(cors());

// parse json
app.use(bodyParser.json());
// parse form data:
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// get todos by status
app.get("/api/todos/:status", function (req, res) {
  const todoStatus = req.params.status;
  todos
    .find({ status: todoStatus })
    .sort({ createdAt: todoStatus == "done" ? -1 : 1 })
    .exec(function (err, todos) {
      if (err) res.send(err);
      res.json(todos);
    });
});

//create new todo
app.post("/api/todos", function (req, res) {
  const { title } = req.body;
  const todo = {
    title,
    status: "Incomplete",
    createdAt: new Date(),
  };
  todos.insert(todo, function (err, newTodo) {
    if (err) res.send(err);
    res.status(201).send(newTodo);
  });
});

// update todo
app.put("/api/todos/:id", function (req, res) {
  const todoId = req.params.id;
  const {title, status} = req.body;
  todos.update({ _id: todoId }, {$set: {title, status}}, {}, function (err) {
    if (err) res.send(err);
    res.status(200).send({});
  });
});

//delete todo
app.delete("/api/todos/:id", function (req, res) {
  const todoId = req.params.id;
  todos.remove(
    {
      _id: todoId,
    },
    {},
    function (err) {
      if (err) res.send(err);
      res.status(200).send({});
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
