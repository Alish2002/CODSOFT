import React from 'react';
import {Link} from 'react-router-dom';
const ProjectCard = ({ project }) => {
  return (
    <div className="max-w-sm  border-2 border-blue-500 rounded-lg  overflow-hidden shadow-lg p-6 m-4 bg-blue-50">
      <Link to={`/project/${project._id}`}>
      <div className="font-bold text-xl mb-2 text-blue-700">{project.name}</div>
      <p className="text-gray-700 text-base mb-4">{project.description}</p>
      {project.members && project.tasks && (
        <>
          <p className="text-gray-500 text-sm mb-2">Members: {project.members.length}</p>
          <p className="text-gray-500 text-sm">Tasks: {project.tasks.length}</p>
        </>
      )}
    
      </Link>
    </div>
  );
};

export default ProjectCard;
