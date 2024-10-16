import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <nav>
      <ul className="navbar-left">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/add-task">Add Task</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
