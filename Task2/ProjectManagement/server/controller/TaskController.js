const TaskServices = require("../services/TaskServices");

const TaskController = {
  createTask: async (req, res) => {
    try {
      const {projectId} = req.params;
      const detail = req.body;
      const task =await TaskServices.createTask(detail, projectId);
      res.status(201).send({task});
    } catch (err) {
      res.status(500).send({ message: "Task creation failed." });
    }
  },
  addComment: async(req,res)=>{
    try{
      const {taskId}=req.params;
      const  detail=req.body;
      const task=await TaskServices.addComment(taskId,detail);
      res.status(200).send({task});
    }catch(err){
        console.error('Error adding comment.');
        res.status(500).send({message:'Error adding comment'});
    }
  },
  addAssignee: async(req,res)=>{
    try{
       const {taskId}=req.params;
       const {userId}=req.body;
       const task=await TaskServices.addAssignee(taskId,userId);
       res.status(200).send({task});
    }catch(err){
        console.error('Error adding assignee.');
        res.status(500).send({message:'Error adding assignee'});
    }
  },
  removeAssignee: async(req,res)=>{
    try{
       const {taskId}=req.params;
       const {userId}=req.body;
       const task=await TaskServices.removeAssignee(taskId,userId);
       res.status(200).send({task});
    }catch(err){
        console.error('Error removing assignee');
        res.status(500).send({message:'Error removing assignee'});
    }
  }
};

module.exports=TaskController;
