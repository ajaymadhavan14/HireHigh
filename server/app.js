import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// import bcrypt from "bcrypt";
// import adminDB from './model/adminSchema.js'

import dbconnection from './config/connection.js';
import seekerRouter from './routes/seekerRouter.js';
import recruiterRouter from './routes/recruiterRouter.js';
import adminRouter from './routes/adminRouter.js';

config();

const port = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(logger('dev'));

// const addadmin =  async() => {
// let password = "123456"
// const name = "ADMIN"
// let salt = await bcrypt.genSalt(10)
// let pass = await bcrypt.hash(password, salt)
// let email = "admin@gmail.com"
//  await adminDB.insertMany({
//     email:email,
//     password:pass,
//     name:name
//   })
// }
//  addadmin()

app.use('/', seekerRouter);
app.use('/recruiter', recruiterRouter);
app.use('/admin', adminRouter);

app.use(dbconnection);

app.listen(port, () => {
  console.log(`server listening at http://127.0.0.1:${port}`);
});

export default app;
