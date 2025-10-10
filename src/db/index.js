import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"


const connectDB = async () => {
    try{
        const connectionInstantce = await mongoose.connect(`${process.env.MONGODB_URL}/ ${DB_NAME}`)
        // console.log(connectionInstantce,'connectionInstantce')
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstantce.connection.host}`);
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;