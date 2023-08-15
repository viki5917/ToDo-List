//npm i express mongoose cors
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//CONNECTION to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

//READ
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//CREATE
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

//DELETE
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

//strickout
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
