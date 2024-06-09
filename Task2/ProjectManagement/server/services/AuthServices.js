const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Token = require("../model/Token");
const crypto = require("crypto");
const nodemailer=require("nodemailer");
const path = require('path');
const jwt=require('jsonwebtoken');
require("dotenv").config();


const AuthServices = {
  register: async (detail) => {
    try {
      const { name, email, password } = detail;
      const user = await User.findOne({ email: email });
      if (user){
        return {
          message: "A User with given email Already Exists!",
          user: null
        };
      }
      const newUser = new User({ name, email, password });

      bcrypt.hash(newUser.password, 10, async (err, hashed) => {
        newUser.password = hashed;
        await newUser.save();
      });

        const token= await AuthServices.generateToken(newUser);
        console.log(token);
        const link= `http://localhost:5000/api/user/confirm/${token.token}`;
        AuthServices.verifyEmail(email,link);
        // return {message:"Email sent. Check your mail",user:newUser};
      return newUser;
    } catch (e) {
      console.error(`Error Regitering the new user : ${e.message}`);
    }
  },
  login:async(detail)=>{
      try{
        const {email,password}=detail;
        const user= await User.findOne({email});
        if(!user){
          return {success:false,message:'Invalid Email'};
        }
        if(!user.verified){
          return {success:false,message:'Email not verified.Please verify your email to log in.'};
        }
        const passwordMatch= await bcrypt.compare(password,user.password);
        if(!passwordMatch){
          return {success:false,message:'Invalid Password'};
        }

        const payload={id:user._id,name:user.name,email:user.email};
        const token=jwt.sign(payload,process.env.SECRET,{'expiresIn':'1h'});
        return {success:true,token:`Bearer ${token}`};
      }
      catch(err){
        console.error('Error Login :'+err.message);
      }
  },
  generateToken: async (newUser) => {
    try {
      const token = new Token({
        userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();
      console.log(token);
      return token;
    } catch (err) {
      console.error({ message: "Error Generating token" });
    }
  },
  verifyEmail: async (email, link) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASSWORD,
        },
      });

      // send email
      let info = await transporter.sendMail({
        from: process.env.User, // sender mail
        to: email, // receiver
        subject: "Account Verification",
        text: "Welcome",
        html: `
               <div>
                    <a href=${link}> Click here to Verify your email</a>
               </div>
            `, // mail body
      });
      console.log("mail send successfully");
    } catch (err) {
      console.error(`Error sending mail :${err.message}`);
    }
  },
  activeAccount: async (req,res) => {
    try{
        const token= await Token.findOne({token:req.params.token});
        const viewsPath = path.join(__dirname, '../public/views');
        
        await User.updateOne({_id:token.userId},{$set:{verified:true}});
        await Token.findByIdAndDelete(token._id);
        res.sendFile(path.join(viewsPath, 'verificationSuccess.html'));
      
    }
    catch(err){
      console.error(`Error activating the account : ${err.message}`);
      res.status(400).send("An error occured");
    }
  },  
  forgotPassword: async(req,res)=>{
    try{
        const {email}=req.body;
        console.log(email);
        const user= await User.findOne({email});
        const token= await AuthServices.generateToken(user);
        const transporter= nodemailer.createTransport({
          service: "Gmail",
          auth:{
            user:process.env.EMAILUSER,
            pass:process.env.EMAILPASSWORD
          }
        });

        const link=`http://127.0.0.1:5000/api/user/reset-password/view/${token.token}`;
        const info= await transporter.sendMail({
          from:process.env.EMAILUSER,
          to: email,
          subject:"Password Reset.",
          text:"Reset the Password.",
          html:`
             <div>
                 <a href=${link}>Click here to reset your account's password </a>
             </div>
          `
        });

         res.status(200).send("password reset email send successfully");
    }
    catch(err){
      console.error(`Error Forgeting password.`);
    }
  },
  resetPassword: async(req,res)=>{
    try{
        const token=await Token.findOne({token:req.params.token});
        const newPassword= req.body['new-password'];

        const hashed=await bcrypt.hash(newPassword,10);
        await User.updateOne({_id:token.userId},{$set:{password:hashed}});
        
        await Token.findByIdAndDelete(token._id);
        const viewsPath = path.join(__dirname, '../public/views');
        res.sendFile(path.join(viewsPath,"resetSuccessful.html"));
    }
    catch(err){
      res.status(500).json({message:'Error Reseting password'});
    }
  }
};

module.exports = AuthServices;
