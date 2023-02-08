import express from 'express'
import cors from "cors"
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import { config } from "dotenv"
config()


import dbconnection from './config/connection.js'
import seekerRouter from "./routes/seekerRouter.js"
// const seekerRouter = require('./routes/seekerRouter')
// import recruiterRouter from './routes/recruiterRouter.js'
// import adminRouter from './routes/adminRouter.js'

const port = process.env.PORT
const app = express()

app.use(cors())

app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json({extended: false, limit: '50mb'}));
app.use(express.static("public"))
app.use(cookieParser())


app.use('/',seekerRouter)
// app.use('/recruiter',recruiterRouter)
// app.use('/admin',adminRouter)

app.use(dbconnection)

app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

export default app