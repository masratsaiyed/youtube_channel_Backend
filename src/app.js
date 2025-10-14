import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();  // All express properties transfer in app varible

app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true , limit:"20kb"}))
app.use(express.static('public'))
app.use(cookieParser())
export { app }
/* you can also use thi one: export default app; 
 both are same
 **/
