import React from 'react'

const AddTaskDialog = ({project,taskDetails,setTaskDetails,handleAddTaskSubmit,setShowAddTaskDialog}) => {
  return (
    <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded shadow-lg max-h-full overflow-y-auto w-11/12 max-w-4xl">
      <div className="h-96 overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4">Add New Task</h3>
        <form onSubmit={(e)=>{handleAddTaskSubmit(e)}}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={taskDetails.title}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={taskDetails.description}
              onChange={(e) =>
                setTaskDetails({
                  ...taskDetails,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              value={taskDetails.status}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, status: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="to-do">To-do</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Priority
            </label>
            <select
              value={taskDetails.priority}
              onChange={(e) =>
                setTaskDetails({
                  ...taskDetails,
                  priority: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={taskDetails.dueDate}
              onChange={(e) =>
                setTaskDetails({
                  ...taskDetails,
                  dueDate: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Assign To
            </label>
            <select
              multiple
              value={taskDetails.assignedTo}
              onChange={(e) =>
                setTaskDetails({
                  ...taskDetails,
                  assignedTo: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            >
              {project.members.map((member) => (
                <option key={member.userId._id} value={member.userId._id}>
                  {member.userId.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddTaskDialog(false)}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddTaskDialog
