import React, { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosApi from "../../axios/api";
import TaskDetailDialog from "../DialogBox/TaskDetailDialog";
import AddTaskDialog from "../DialogBox/AddTaskDialog";
import AddMemberDialog from "../DialogBox/AddMemberDialog";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const [project, setProject] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState(null);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "medium",
    assignedTo: [],
    dueDate: "",
  });
  const { updateProject } = useProjects();


  useEffect(() => {
    if (projects.length > 0) {
      console.log("params", projectId);
      const foundProject = projects.find((proj) => proj._id === projectId);
      console.log("foundProject");
      console.log(foundProject);
      console.log(user);
      if (foundProject) {
        setProject(foundProject);
        const member = foundProject.members.find(
          (member) => member.userId._id === user.id
        );
        console.log("member:", member);
        if (member) {
          setUserRole(member.role);
        } else {
          console.error(
            `User with id ${user.id} is not a member of project with id ${projectId}`
          );
        }
      } else {
        console.error(`Project with id ${projectId} not found.`);
      }
    }
  }, [projects, projectId]);

  const handleTaskClick = (task) => {
    console.log("handle",task);
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  const handleAddMember = () => {
    setShowAddMemberDialog(true);
  };

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosApi.get(`user/detail/${newMemberEmail}`);
      console.log(res.data.user);
      const newUser = res.data.user;
      project.members.push({ userId: newUser, role: newMemberRole });
      await updateProject(project);
      setShowAddMemberDialog(false);
      setNewMemberEmail("");
      setNewMemberRole("member");
    } catch (err) {
      console.error("Error adding member");
    }
  };

  const handleAddTask = () => {
    setShowAddTaskDialog(true);
  };

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { ...taskDetails };
      const res = await axiosApi.post(`project/${project._id}/task`, newTask);
      const updatedProject = {
        ...project,
        tasks: [...project.tasks, res.data.task],
      };
      await updateProject(updatedProject);
      setProject(updatedProject);
      setShowAddTaskDialog(false);
      setTaskDetails({
        title: "",
        description: "",
        status: "to-do",
        priority: "medium",
        assignedTo: [],
        dueDate: "",
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  if (!project) {
    return <p className="text-gray-700">No project selected.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-purple-700">
        {project.name}
      </h2>
      <p className="text-gray-700 mb-6 text-center">{project.description}</p>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Members</h3>
        <ul className="list-disc list-inside space-y-2">
          {project.members.map((member, idx) => (
            <li key={idx} className="text-gray-600 flex items-center">
              <span className="font-medium">{member.userId.name}</span>
              <span className="ml-2 text-gray-500">
                ({member.userId.email})
              </span>
              <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {member.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-green-700">Tasks</h3>
        <ul className="space-y-4">
          {project.tasks.map((task, idx) => (
            <li
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <h4 className="font-semibold text-lg mb-2">{task.title}</h4>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  Priority: {task.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showAddMemberDialog && (
        <AddMemberDialog handleAddMemberSubmit={handleAddMemberSubmit} newMemberEmail={newMemberEmail} setNewMemberEmail={setNewMemberEmail} newMemberRole={newMemberRole} setNewMemberRole={setNewMemberRole} setShowAddMemberDialog={setShowAddMemberDialog} />
      )}

      {selectedTask && (
        <TaskDetailDialog task={selectedTask} onClose={handleCloseDialog} />
      )}
      

      {(userRole === "admin" || userRole === "manager") && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddMember}
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Add Member
          </button>
          <button
            onClick={handleAddTask}
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      )}

      {showAddTaskDialog && (
        <AddTaskDialog project={project} taskDetails={taskDetails} setTaskDetails={setTaskDetails} setShowAddTaskDialog={setShowAddTaskDialog} handleAddTaskSubmit={handleAddTaskSubmit}  />
      )}
    </div>
  );
};

export default ProjectDetail;
