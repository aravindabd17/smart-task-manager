const path = require("path");
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
        try {
            let query={};
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const search = req.query.search || "";

            const skip=(page-1) * limit;
            if(req.user.role!=="admin")
                query={assignedTo:req.user._id};

            if(search)
            {
                query={
                    ...query,
                    $or:[
                        {title:{$regex:search,$options:'i'}},
                        {description:{$regex:search,$options:'i'}},
                    ]
                };
                
            }

            const totalPages=await Task.countDocuments(query);
            const tasks=await Task.find(query)
                .populate("assignedTo","name email")
                .sort({createdAt:-1})
                .skip(skip)
                .limit(limit);

            console.log(tasks);
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

//     exports.getTasks = async (req, res) => {
//     try {
//         let baseQuery = {};

//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || "";

//         const skip = (page - 1) * limit;

//         // ✅ role filter
//         if (req.user.role !== "admin") {
//             baseQuery.assignedTo = req.user._id;
//         }

//         let finalQuery = baseQuery;

//         // ✅ proper search + role combination
//         if (search) {
//             finalQuery = {
//                 $and: [
//                     baseQuery,
//                     {
//                         $or: [
//                             { title: { $regex: search, $options: 'i' } },
//                             { description: { $regex: search, $options: 'i' } }
//                         ]
//                     }
//                 ]
//             };
//         }

//         const totalTasks = await Task.countDocuments(finalQuery);

//         const tasks = await Task.find(finalQuery)
//             .populate("assignedTo", "name email")
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);

//         res.json({
//             tasks,
//             currentPage: page,
//             totalPages: Math.ceil(totalTasks / limit),
//             totalTasks
//         });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
exports.updateTask=async(req,res)=>{
    try
    {
        const task=await Task.findById(req.params.id);
        if(!task)
            return res.status(404).json({message:"Task not found"});
        const {title,description,assignedTo}=req.body;

        console.log(assignedTo);
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
        console.log(error);
        return res.status(500).json({message:error.message});
    }
};
exports.deleteTask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    console.log(req.params.id);
    if(!task)
        return res.status(404).json({message:"Task not found"});
    try {
        if (task.file) {
            const filePath = path.join(__dirname, '..', 'uploads', task.file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.json({message:"Task deleted"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};