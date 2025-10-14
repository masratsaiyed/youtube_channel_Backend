import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"
import { app } from "../app.js";

const connectDB = async() => {
    try{
        const connectionInstantce = await mongoose.connect(`${process.env.MONGODB_URL}/ ${ DB_NAME }`)
        console.log(`\n Mongo connected !! DB HOST : ${connectionInstantce.connection.host} `)
    }
    catch(error){
        console.log(`Error is show in ${error}`);
        process.exit(1)
    }
}

export default connectDB;