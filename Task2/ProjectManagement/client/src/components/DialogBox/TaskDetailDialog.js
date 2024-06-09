import React from 'react';

const TaskDetailDialog = ({ task, onClose }) => {
  console.log("task");
  console.log(task);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md">
        <h3 className="text-2xl font-semibold mb-4">{task.title}</h3>
        <p className="text-gray-700 mb-2"><strong>Description:</strong></p>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <p className="text-gray-700 mb-2"><strong>Priority:</strong> {task.priority}</p>
        <p className="text-gray-700 mb-2"><strong>Status:</strong> {task.status}</p>
        <p className="text-gray-700 mb-2"><strong>Assigned To:</strong></p>
        <ul className="list-disc list-inside mb-2">
          {task.assignedTo.map((user, index) => (
            <li key={index} className="text-gray-600">
              {user.name}
            </li>
          ))}
        </ul>
        <p className="text-gray-700 mb-2"><strong>Due Date:</strong> {task.dueDate}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailDialog;
