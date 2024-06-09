const express= require('express');
const TaskController=require('../controller/TaskController');

const router=express();

router.post('/:taskId/comment',TaskController.addComment);
router.post('/:taskId/assignee',TaskController.addAssignee);
router.delete('/:taskId/assignee',TaskController.removeAssignee);

module.exports=router;