const Project = require("../model/Project");
const Task = require("../model/Task");
const Comment=require('../model/Comment');
const TaskServices = {
  createTask: async (detail, projectId) => {
    try {
      const newTask = new Task({ ...detail, projectId: projectId });
      if(!newTask){
        throw new Error('Incorrect Task Deatils ');
      }
      await newTask.save();
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
      return newTask;
    } catch (err) {
      console.error("Error Creating Task:" + err.message());
      throw err;
    }
  },
  fetchTaskFromDB: async()=>{
    try{
      
    }catch(err){
      console.error('Error fetching tasks');
    }
  },
  addComment: async (taskId, detail) => {
    try {
      const { author, content } = detail;
      if(!author || !content || !taskId){
        throw new Error('taskId, author and content are required');
      }
      const newComment = new Comment({ taskId, author, content });
      if(!newComment){
        throw new Error('Incorrect Details provided.');
      }
      await newComment.save();
      const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $push: {comments:newComment._id},
      },{new:true});
      return updatedTask;
    } catch (err) {
      console.error("Error adding comment.");
    }
  },
  addAssignee: async(taskId,userId)=>{
    try{
        const task= await Task.findByIdAndUpdate(taskId,{
            $addToSet:{assignedTo:userId}
        },{new:true}).populate('assignedTo');
        if(!task){
          throw new Error('Incorrect Info provided.');
        }
        return task;
    }catch(err){
        console.error('Error adding assignee');
        throw err;
    }
  },
  removeAssignee: async(taskId,userId)=>{
    try{
      const task=await Task.findByIdAndUpdate(taskId,{
        $pull:{assignedTo:userId}
      },{new:true}).populate('assignedTo');
      if(!task){
        throw new Error('Incorrect Info provided.');
      }
      return task;
    }catch(err){
        console.error('Error removing assignee.');
        throw err;
    }
  }
};

module.exports = TaskServices;
