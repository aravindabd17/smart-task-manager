const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");

const userRoute=require('./routes/userRoute');
const taskRoute=require('./routes/taskRoute');
const commentRoute=require("./routes/commentRoute");

const app=express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static("uploads"));

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("mongodb connected");
});

app.use("/api/auth",userRoute);
app.use("/api/task",taskRoute);
app.use("/api/comment",commentRoute);

app.listen(process.env.PORT,()=>{
    console.log(`App connected to the PORT ${process.env.PORT}`);
});
