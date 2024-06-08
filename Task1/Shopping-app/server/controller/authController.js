const User=require('../model/User');
const bycrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const config=require('../config');
const register=(req,res)=>{
    // destructuring      req.body={name:'',password:''}
    // const name=req.body.name;
    // console.log(req.body);
    const {username,password}=req.body;

    // console.log('name:'+ username+'  password:'+password);

//  creating a new row with name and password
    const newUser=new User({username,password});
    console.log(newUser);
    // hashing the password
    bycrypt.genSalt(10,(err,salt)=>{
        bycrypt.hash(newUser.password,salt,(err,hashed)=>{
            newUser.password=hashed;

            // saving to databse
            console.log("saving to db");
            newUser
            // chaining
                .save()
                
        })
    })
    return res.json(newUser);
}

const login=(req,res)=>{
    console.log(req.body);
   const {username,password}=req.body;
//    console.log(name);
//    const user=User.findOne({name});
//    console.log(User.findById({id:'6598f2ea7331779bd5dc53ce'}).name);

   User.findOne({username}).then(user=>{
     bycrypt.compare(password,user.password,(err,isMatch)=>{

        if(isMatch){
            // patyload is an object having the data related to user
            const payload={id:user.id,username:user.username};
            const token= jwt.sign(payload,config.secret,{'expiresIn':'1h'});
            console.log(token);
            res.status(200).json({'token':'Bearer '+token});
            {}
        }
        else{
            res.status(400).json({message:'Password incorrect'});
        }
     })
   })
   
}

module.exports={register,login};