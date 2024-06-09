const mongoose=require('mongoose');

const tokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    token:{
        type: String,
        required:true
    },
    expiresAt:{
        type:Date,
        default:Date.now()+ (60*60*1000)  // default expiration time: 1 hour 
    }
});

const token=mongoose.model('token',tokenSchema);

module.exports=token;