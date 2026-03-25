const express=require("express");
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");
const router=express.Router();

router.post("/:id",protect,async(req,res)=>{
    const {comment}=req.body;
    try {
        const task=await Comment.create({
            text:comment,
            task:req.params.id,
            user:req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});
router.get("/:id",protect,async(req,res)=>{
    try {
        const task=await Comment.find({task:req.params.id});
        res.json(task);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

module.exports=router;