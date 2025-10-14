// Importing necessary packages
import express from 'express'       // Import Express framework
import cors from 'cors'             // Import CORS middleware (for cross-origin access)
import cookieParser from 'cookie-parser';  // Import cookie-parser to handle cookies

// Initialize the Express app
const app = express();  
// 'app' variable now contains all Express functions (like routing, middleware, etc.)

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Allow requests only from this origin (set in .env file)
    credentials: true                 // Allow cookies and authorization headers in requests
}))

// Middleware to parse JSON data coming from the client
app.use(express.json({ limit: "20kb" }))
// limit: "20kb" means maximum 20 kilobytes of JSON data allowed in a single request

// Middleware to parse URL-encoded data (like from HTML forms)
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
// extended: true allows nested objects to be parsed correctly

// Middleware to serve static files like images, CSS, JS from 'public' folder
app.use(express.static('public'))
// Example: public/logo.png can be accessed from http://localhost:8000/logo.png

// Middleware to parse cookies from the client requests
app.use(cookieParser())
// After this, you can use req.cookies and res.cookie() in routes

// Exporting the 'app' so it can be used in another file (like server.js)
export { app }
// You can also use: export default app; — both are valid