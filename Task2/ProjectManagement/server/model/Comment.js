const mongoose=require('mongoose');

const commentSchema= new mongoose.Schema({
  taskId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Task',
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  content:{
    type:String,
  },
  createdAt:{
    type:Date,
    default: Date.now()
  }
});

const Comment= mongoose.model("Comment",commentSchema);

module.exports=Comment;