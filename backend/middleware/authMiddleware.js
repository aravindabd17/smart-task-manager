const jwt=require("jsonwebtoken");
const User = require("../models/User");

exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            const token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.SECRET_KEY);
            const user=await User.findById(decoded.id).select("-password");
            req.user=user;
            next();
        } catch (error) {
            return res.status(401).json({error:error.message});
        }
    }
    else
    {
        return res.status(401).json({message:"Invalid token"});
    }
}

exports.admin=async(req,res,next)=>{
    if(req.user && req.user.role==="admin")
    {
        next();
    }
    else 
    {
        return res.status(403).json({message:"Unauthorized"});
    }
}