const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Create a new task
app.post('/tasks', async (req, res) => {
  const { task, completed } = req.body;
  const newTask = new Todo({ task, completed });
  await newTask.save();
  res.json(newTask);
});

// Mark task as completed
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  await Todo.findByIdAndUpdate(taskId, { completed: true });
  res.json({ message: 'Task marked as completed' });
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  await Todo.findByIdAndDelete(taskId);
  res.json({ message: 'Task deleted' });
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Todo.find();
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});