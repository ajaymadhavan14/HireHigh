
import express from 'express'
import cors from "cors"
import { config } from "dotenv"
config()

import dbconnection from './config/connection.js'
// import seekerRouter from './routes/seekerRouter.js'
// import recruiterRouter from './routes/recruiterRouter.js'
// import adminRouter from './routes/adminRouter.js'

const app = express()
app.use(express.json())
app.use(cors)

// app.use('/',seekerRouter)
// app.use('/recruiter',recruiterRouter)
// app.use('/admin',adminRouter)

app.use(dbconnection)

app.listen(5000)