const express=require("express");
const Router=express.Router();
const bcrypt=require("bcryptjs");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const { protect, admin } = require("../middleware/authMiddleware");

Router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const userexists=await User.findOne({email});
        if(userexists)
            return res.status(400).json({message:"User already exists!"});
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password:hashPassword
        });
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

Router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)
            return res.status(401).json({message:"Userid doesn't exists!"});

        const checkPassword=await bcrypt.compare(password,user.password);
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

Router.get("/profile",protect,async(req,res)=>{
    res.json(req.user);
});
Router.get("/admin",protect,admin,async(req,res)=>{
    res.json({message:"this is admin"});
});
module.exports=Router;