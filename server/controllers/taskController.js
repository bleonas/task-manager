const Task = require('../models/taskModel');


exports.createTask = async (req, res) => {
  const { title, description } = req.body; 
  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id, 
    });
    await newTask.save();
    res.status(201).json(newTask); 
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: 'Task creation failed' });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
};


exports.getTaskById = async (req, res) => {
  const { id } = req.params; 
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task); 
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};


exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } 
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};


exports.markAsDone = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: { completed: true } },  
      { new: true }  
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);  

  } catch (error) {
    res.status(500).json({ error: 'Failed to mark task as done' });
  }
};

