const { fetchProjects } = require("../controller/ProjectController");
const Project = require("../model/Project");
const { $where } = require("../model/User");

const ProjectServices = {
  createProject: async (detail) => {
    try {
      const { name, description, members } = detail;
      const newProject = new Project({ name, description, members });
      await newProject.save();
      return newProject;
    } catch (err) {
      console.error("Error creating a new Project: " + err.message);
      throw err;
    }
  },
  fetchProjectFromDB: async(userId)=>{
    try{
      const projects=await Project.find({'members.userId':userId}).populate('members.userId').populate({
        path: 'tasks',
        populate: {
          path: 'assignedTo',
          model: 'User'
        }
      });;
      return projects;
    }catch(err){
      console.error('Error fetching projects :'+err.message);
    }
  },
  updateProjectFromDB:async(projectId,updateDetails)=>{
    try{
      const updatedProject= await Project.findByIdAndUpdate(projectId,{
        $set: updateDetails
      },{new:true,runValidators:true});
    
      if(!updatedProject){
        throw new Error('Project not found!');
      }
      return updatedProject;
    }catch(err){
      console.error('Error updating project :'+err.message);
    }
  },
  removeProjectFromDB:async(projectId)=>{
    try{
      const project=await Project.findByIdAndDelete(projectId);
      if(!project){
        throw new Error('Project not found');
      }
      return project;
    }catch(err){
      console.error('Error removing project');
    }
  },
  addMemberToProject: async (projectId, userId, role) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
          $push: { members: { userId, role } },
        },
        { new: true, useFindAndModify: false }
      );
      return {
        success: true,
        message: "Member added successfully",
        project: updatedProject,
      };
    } catch (err) {
      console.error("Error Adding user to project :" + err.message);
      throw err;
    }
  },
  removeMemberFromProject: async (projectId, userId) => {
    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        {
          $pull: { members: { userId: userId } },
        },
        { new: true }
      );
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    } catch (err) {
      console.error("Error removing the user");
      throw err;
    }
  },
};

module.exports = ProjectServices;
