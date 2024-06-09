const express=require('express');
const ProjectController = require('../controller/ProjectController');
const TaskController=require('../controller/TaskController');
const ProjectServices = require('../services/ProjectServices');
const router=express.Router();


router.post('/create',ProjectController.createProject);
router.get('/get/:userId',ProjectController.fetchProjects);
router.post('/:projectId/member',ProjectController.addMemberToProject);
// router.delete('/:projectId/members/:userId',ProjectController.removeMemberFromProject);
router.post('/:projectId/task',TaskController.createTask);
router.put('/update/:projectId',ProjectController.updateProject);
// router.delete('/remove/:projectId',);

module.exports=router;