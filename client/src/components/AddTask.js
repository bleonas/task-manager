import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MainStyle.css'; 


function AddTask() {
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const navigate = useNavigate();

  const addTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:5000/api/tasks', 
        { title, description }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setTitle(''); 
      setDescription(''); 
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container"> 
      <h2>Add New Task</h2>
      <form onSubmit={addTaskHandler}>
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
