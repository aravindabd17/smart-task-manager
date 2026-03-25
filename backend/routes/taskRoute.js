const express=require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const router=express.Router();

router.post("/createtask",protect,upload.single("file"),createTask);
router.get("/getTasks",protect,getTasks);
router.put("/updateTask/:id",protect,updateTask);
router.delete("/deleteTask/:id",protect,deleteTask);

module.exports=router;

