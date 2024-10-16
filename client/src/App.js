import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'; 
import TaskDashboard from './components/TaskDashboard';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import PageNotFound from './components/PageNotFound';

function PrivateRoute({ element }) {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />}  />
        <Route path="/dashboard" element={<PrivateRoute element={<TaskDashboard />} />} />
        <Route path="/add-task" element={<PrivateRoute element={<AddTask />} />} />
        <Route path="/edit-task/:id" element={<PrivateRoute element={<EditTask />} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
