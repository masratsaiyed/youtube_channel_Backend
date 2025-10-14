// Importing mongoose for MongoDB connection
import mongoose from "mongoose";

// Importing database name constant (for cleaner code)
import { DB_NAME } from "../constants.js";

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connecting to MongoDB using the connection string from the .env file
        // `${process.env.MONGODB_URL}` -> Base URL from environment variable
        // `${DB_NAME}` -> Database name constant
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        // Log a success message if connection is successful
        console.log(`\n MongoDB connected successfully!`);
        console.log(`DB Host: ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        // If connection fails, log the error message
        console.log(`MongoDB Connection Failed: ${error}`);

        // Exit the process with failure code (1)
        process.exit(1);
    }
}

// Exporting the function so it can be used in server/index file
export default connectDB;