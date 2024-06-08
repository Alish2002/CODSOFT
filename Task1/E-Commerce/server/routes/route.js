const express=require('express');
// /making router instance to handle routing
const router=express.Router();

const authController=require('../controller/authController');
const config=require('../config')


const isAuthorized=(req,res,next)=>{
    const userToken=req.header('Authorization');
    if(userToken=='' || !userToken.startsWith('Bearer ')){
        return res.sendStatus(401);
    }
     
    const token=userToken.split(' ')[1];

    jwt.verify(token,config.secret,(err,user)=>{
        console.log(user.username);
        next();
    });

}

router.post('/auth/register',authController.register);

// it routes here from app.use()
router.post('/auth/login',authController.login);
// router.route("/auth/login", (req, res)=>{
//     res.send("hello server in login");
// });





module.exports=router;