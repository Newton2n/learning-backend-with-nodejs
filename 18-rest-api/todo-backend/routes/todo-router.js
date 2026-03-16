//external
const express = require("express");

//local
const { createTodo,getAllTodo,deleteTodo } = require("../controllers/create-todo");

const todo = express.Router();

todo.post("/", createTodo);
todo.get("/", getAllTodo);
todo.delete("/:id", deleteTodo);

//  Export the router to be used in other files
module.exports = todo;
