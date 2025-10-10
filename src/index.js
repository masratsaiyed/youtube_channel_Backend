import dotenv from "dotenv"
import connectDB from "./db/index.js";

import express from "express";
const app = express;

dotenv.config({
    path:'./env'
})
connectDB();
/* ; in front of function check previous statement is completetd
(async ()=>{
    try{
        mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",() =>{
            console.log("ERROR:",error)
            throw error;
        })
        app.listen(process.env.PORT,() =>{
            console.log(`App is listening on port ${process.env.PORT}`); 
        })
    } catch (error) {
        console.log(error);
        throw err;
    }
 })() **/