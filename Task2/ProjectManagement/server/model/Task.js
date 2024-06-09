const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description:{
    type:String
  },
  status:{
    type: String,
    enum:['to-do','in-progress','completed'],
    default: 'to-do'
  },
  priority:{
    type: String,
    enum:['low','medium','high'],
    default:'medium'
  },
  assignedTo:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  }],
  projectId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Project',
    required:true
  },
  dueDate:{
    type:Date,
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }]
},{
    timestamps:true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
