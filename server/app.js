import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import dbconnection from './config/connection.js';
import seekerRouter from './routes/seekerRouter.js';
import recruiterRouter from './routes/recruiterRouter.js';
import adminRouter from './routes/adminRouter.js';
import companyRouter from './routes/companyRouter.js';

config();

const port = process.env.PORT;
const { DATABASE_URL } = process.env;
const app = express();
dbconnection(DATABASE_URL);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api/', seekerRouter);
app.use('/api/recruiter', recruiterRouter);
app.use('/api/admin', adminRouter);
app.use('/api/company', companyRouter);

app.listen(port, () => {
  console.log(`server listening at http://127.0.0.1:${port}`);
});

export default app;
