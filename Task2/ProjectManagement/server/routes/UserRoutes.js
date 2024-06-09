const express=require('express');
const AuthController=require('../controller/AuthController');
const AuthServices = require('../services/AuthServices');
const path=require('path');
const UserServices = require('../services/UserServices');

const router=express.Router();

router.post('/auth/register',AuthController.register);
router.post('/auth/login',AuthController.login);
router.post('/auth/forgot-password',AuthServices.forgotPassword);
router.get('/confirm/:token', AuthServices.activeAccount);

router.get('/reset-password/view/:token',async (req,res)=>{
    try{
        const token= req.params.token;
        const viewsPath = path.join(__dirname, '../public/views');
        res.sendFile(path.join(viewsPath, 'passwordReset.html'));
    }
    catch(err){
        res.status(500).send("Error Reseting Password")
    }
});
router.post('/reset-password/:token',AuthServices.resetPassword);


router.get('/detail/:email',UserServices.fetchUser);


module.exports=router;
