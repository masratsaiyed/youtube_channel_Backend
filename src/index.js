// Importing required modules
import dotenv from "dotenv"                // To load environment variables from .env file
import connectDB from "./db/index.js"      // Importing database connection function

import express from "express"              // Importing Express framework
const app = express();                     // Creating an Express application instance

// Configure dotenv to load variables from the .env file
dotenv.config({
    path: './env'                          // Path to your environment file (./env)
})

// Connect to MongoDB database
connectDB()
.then(() => {
    // If the database connection is successful, start the server
    const port = process.env.PORT || 8000; // Read port from .env or use 8000 by default

    app.listen(port, () => {               // Start the Express server
        console.log(`Server is running at port: ${port}`);
    });
})
.catch((err) => 
    // If database connection fails, show the error message
    console.log(`MongoDB connection Failed: ${err} !!!`)
);
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