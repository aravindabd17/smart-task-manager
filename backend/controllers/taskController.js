const Task = require("../models/Task");
const fs=require("fs");

exports.createTask=async(req,res)=>{
    const {title,description,assignedTo}=req.body;
    try
    {
        const task=await Task.create({
            title,
            description,
            assignedTo,
            createdBy:req.user._id,
            file:req.file?`/uploads/${req.file.filename}`:null
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
            let query={};
            const page=req.query.page || 1;
            const limit=req.query.limit || 5;
            const skip=(page-1)/limit;

            if(req.user.role!=="admin")
                query={assignedTo:req.user._id};

            const totalPages=await Task.countDocuments(query);
        
            const tasks=await Task.find(query)
                .populate("assignedTo","name email")
                .sort({createdAt:-1})
                .skip(skip)
                .limit(limit);

            res.json({
                tasks,
                currentPage:page,
                pageCount:Math.ceil(totalPages/limit),
                totalPages
            });
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    };
exports.updateTask=async(req,res)=>{
    try
    {
        const task=await Task.findById(req.params.id);
        if(!task)
            return res.status(404).json({message:"Task not found"});
        const {title,description,assignedTo}=req.body;
        if(req.user.role!=="admin" && task.assignedTo.toString()!==req.user._id)
            return res.status(403).json({message:"Unauthorized!"});
        if(req.file)
        {
            if(task.file)
            {
                fs.unlinkSync(`.${task.file}`);
            }
            else 
            {
                console.log("file already deleted!");
            }
            task.file=`/uploads/${req.file.filename}`;
        }
        task.title=title;
        task.description=description;
        task.assignedTo=assignedTo;
        const updatedTask=await task.save();
        res.json(updatedTask);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
exports.deleteTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task)
        return res.status(404).json({message:"Task not found"});
    try {
        if(task.file)
        {
            fs.unlinkSync(`.${task.file}`);
        }
        await Task.findByIdAndDelete(req.params.id)
        res.json({message:"Task deleted"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};