import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error; 
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/users/update-username',
        { username: newUsername }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data.message === 'Username updated successfully'; 
    } catch (error) {
      console.error('Error updating username:', error);
      return false; 
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/users/update-password',
        { currentPassword, newPassword }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data.message === 'Password updated successfully'; 
    } catch (error) {
      console.error('Error updating password:', error);
      return false; 
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUsername(profileData.username);
      } catch (error) {
        alert('Failed to fetch profile. Please log in again.');
        navigate('/login'); 
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const success = await updateUsername(newUsername);
      if (success) {
        setUsername(newUsername);
        setNewUsername('');
        alert('Username updated successfully!');
      } else {
        alert('Username already exists!');
      }
    } catch (error) {
      alert('Failed to update username. Please try again.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const success = await updatePassword(password, newPassword);
      if (success) {
        setPassword('');
        setNewPassword('');
        alert('Password updated successfully!');
      } else {
        alert('Password update failed! Please check your current password.');
      }
    } catch (error) {
      alert('Failed to update password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome to your profile, {username}</h1>

      <form onSubmit={handleUsernameChange}>
        <h2>Change Username</h2>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
        <button type="submit">Update Username</button>
      </form>

      <form onSubmit={handlePasswordChange}>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default Profile;
