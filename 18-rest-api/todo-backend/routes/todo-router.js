//external
const express = require("express");

//local
const { createTodo } = require("../controllers/create-todo");

const todo = express.Router();

todo.get("/", createTodo);

//  Export the router to be used in other files
module.exports = todo;
