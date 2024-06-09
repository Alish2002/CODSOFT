const ProjectServices = require("../services/ProjectServices");

const ProjectController={
    createProject: async (req,res)=>{
      try{
        const detail=req.body;
        const newProject=await  ProjectServices.createProject(detail);
        res.status(201).json({newProject});
      }catch(err){
        console.error('Error adding new Project: '+err.message);
        res.status(500).send({message:'Error adding new project'});
      }
    },
    fetchProjects:async(req,res)=>{
      try{
        const {userId}=req.params;
        
        const projects= await ProjectServices.fetchProjectFromDB(userId);
        if(!projects || projects.length==0){
         return res.status(404).send({message:'No Projects found for a given user'});
        }
        res.status(200).send({projects});
      }catch(err){
        console.error('Error Fetching Projects'+err.message);
        res.status(500).send({message:'Error Fetching Projects'});
      }
    },
    updateProject: async(req,res)=>{
      try{
        const {projectId}=req.params;
        const updateDetails=req.body;
        const updatedProject= await ProjectServices.updateProjectFromDB(projectId,updateDetails);

        res.status(200).send({updatedProject});
      }catch(err){
        console.error('Error updating project:'+err.message);
        res.status(500).send({message:'Error updating project'});
      }
    },
    removeProject :async(req,res)=>{
      try{
          const {projectId}=req.params;
          const project= await ProjectServices.removeProjectFromDB(projectId);
          res.status(200).send({message:'Project removed successfully',project}) ;
      }catch(err){
        res.status(500).send({message:'Error removing project'});
      }
    },
    addMemberToProject: async(req,res)=>{
      try{
        const {projectId}=req.params;
        const {userId,role}=req.body;
        const response=await ProjectServices.addMemberToProject(projectId,userId,role);
        res.status(200).send({project:response.project}); 
      }catch(err){
        console.error('Error adding member to project:'+err.message);
        res.status(500).send({message:'Error adding member to project'});
      }
    },
    removeMemberFromProject: async(req,res)=>{
      try{
        const {projectId,userId}=req.params;
        const project= await ProjectServices.removeMember(projectId,userId);
        res.status(200).send({project});
      }catch(err){
         console.error('Error removing member from project :'+err.message());
      }
    },
    
    
}; 

module.exports=ProjectController;