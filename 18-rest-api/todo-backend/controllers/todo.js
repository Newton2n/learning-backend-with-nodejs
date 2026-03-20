const TodoItem = require("../models/todo");
const mongoose = require('mongoose');
exports.createTodo = async (req, res, next) => {
  console.log(req.body);
  console.log("Hello world");
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};
exports.getAllTodo = async (req, res, next) => {
  const allItem = await TodoItem.find();
  console.log(allItem);
  res.json(allItem);
};
exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  console.log("Todo id",id)
  // const mongoDbObjId =new mongoose.Types.ObjectId(id)
  const allItem = await TodoItem.findByIdAndDelete(id)
  console.log(allItem);
  res.json(allItem);
};
