const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");

const userRoute=require('./routes/userRoute');

const app=express();

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("mongodb connected");
});

app.use("/api/auth",userRoute);

app.listen(process.env.PORT,()=>{
    console.log(`App connected to the PORT ${process.env.PORT}`);
});
