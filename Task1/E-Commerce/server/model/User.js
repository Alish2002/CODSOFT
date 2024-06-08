const mongoose= require('mongoose');

const User=new mongoose.Schema({
    // just like a primary key
    username:{type:String ,required:true,unique:true},
    password:{type:String,required:true}

});

// model is just like creating a table
const userModel=mongoose.model('User',User);

module.exports=userModel;   