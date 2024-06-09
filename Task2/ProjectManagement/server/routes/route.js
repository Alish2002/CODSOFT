const express=require('express');
const userRoute=require('./UserRoutes');
const projectRoute=require('./ProjectRoutes');
const taskRoute=require('./TaskRoutes');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const router=express.Router();

// token verification
const authenticate=(req,res,next)=>{
    try{
        const authHeader=req.header('Authorization');
        if(!authHeader){
            req.status(401).send({message:'Authrization header is missing'});
        }
        const token=authHeader.split(' ')[1];
        if(!token){
            req.status(401).send({message:'Token is missing'});
        }
        const isMatch=jwt.verify(token,process.env.SECRET);
        if(!isMatch){
            return res.status(400).send({message:'Authentication Failed.Bad Request!'});
        }
        next();
    }catch(err){
        console.error('Error checking Authentication.');
        res.status(500).send({message:'Error Authenticating the request'});
    }
}

router.use('/user',userRoute);
// ,authenticate
router.use('/project',projectRoute);
// authenticate,
router.use('/task',taskRoute);
// ,authenticate
module.exports=router;

