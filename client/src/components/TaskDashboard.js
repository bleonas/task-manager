// TaskDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/TaskDashboard.css';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId)); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const markAsDone = async (taskId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, {
        completed: true,  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const completedTask = response.data;
  
      setTasks((prevList) =>
        prevList.map((task) =>
          task._id === completedTask._id ? completedTask : task
        )
      );

      console.log('Task updated successfully:', completedTask);
       fetchTasks();
       
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };
  

  const editTask = (taskId) => {
    navigate(`/edit-task/${taskId}`); 
  };

  return (
    <div>
      <Navbar />
      <h2>Task Dashboard</h2>
      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? 'done' : ''}`}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <button onClick={() => editTask(task._id)}>Edit</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
          <button onClick={() => markAsDone(task._id)}>Done</button>
        </div>
      ))}
    </div>
  );
}

export default TaskDashboard;
