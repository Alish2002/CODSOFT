const AuthServices=require('../services/AuthServices');
const AuthController={
   register: async(req,res)=>{
       try{
        const detail=req.body;
        
        const user=await AuthServices.register(detail);
        if(!user){
            res.status(429).send({message:'A User with given email Already Exists!'});
            return;
        }
        res.status(200).json({user});
       }
       catch(err){
        res.status(500).json({message:'Error Registering!',error:err.message});
       }
   },
   login: async(req,res)=>{
    try{
        const detail=req.body;
        const valid= await AuthServices.login(detail);
        if(!valid.success){
            res.status(401).json({message:valid.message});
            return;
        }

        res.status(200).json({token:valid.token});
    }
    catch(err){
        res.status(500).json({message:'Error Login!',error:err.message});
    }
   },
   
}

module.exports=AuthController;