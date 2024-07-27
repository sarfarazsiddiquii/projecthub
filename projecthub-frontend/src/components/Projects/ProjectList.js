import React, { useState, useEffect } from 'react';
import { getProjects } from '../../Services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        setError('Error fetching projects. Please try again.');
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;