import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask } from '../../Services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      setError('Error fetching tasks. Please try again.');
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      setError('Error creating task. Please try again.');
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      setError('Error updating task. Please try again.');
      console.error('Error updating task:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task Description"
          required
        />
        <button type="submit">Create Task</button>
      </form>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.status}
              <button onClick={() => handleUpdateTaskStatus(task.id, 'IN_PROGRESS')}>
                Start
              </button>
              <button onClick={() => handleUpdateTaskStatus(task.id, 'DONE')}>
                Complete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;