import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import ProjectList from './components/Projects/ProjectList';
import TaskList from './components/Tasks/TaskList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to ProjectHub</h2>;
}

export default App;