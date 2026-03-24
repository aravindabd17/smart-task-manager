const Task = require("../models/Task");

exports.createTask=async(req,res)=>{
    const {title,description,assignedto}=req.body;
    try
    {
        const task=await Task.create({
            title,
            description,
            assignedTo:assignedto,
            createdBy:req.user._id
        });
        res.status(201).json({task});
    }
    catch(error)
    {
        return res.status(500).json({message:error.message});
    }
};
exports.getTasks=async(req,res)=>{
    let tasks;
    try {
       
        if(req.user.role==="admin")
            tasks=await Task.find().populate("assignedTo","name email");
        else
            tasks=await Task.find({assignedTo:req.user._id});

        res.json({tasks});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
exports.updateTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task)
        return res.status(404).json({message:"Task not found"});

    const {title,description,assignedTo}=req.body;
    if(req.user.role!=="admin" && task.assignedTo.toString()!==req.user._id)
        return res.status(403).json({message:"Unauthorized!"});

    try {
        const updatedTask=await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                assignedTo
            },{
                new:true
            }
        );
        res.json({updatedTask});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
exports.deleteTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task)
        return res.status(404).json({message:"Task not found"});

    try {
        await Task.findByIdAndDelete(req.params.id)
        res.json({message:"Task deleted"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};