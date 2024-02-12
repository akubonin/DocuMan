import 'dotenv/config';
import mongoose from 'mongoose';
import express, { Application } from 'express';
import cors, {CorsOptions} from 'cors';
import router from '../src/router.js';
const DBNAME = process.env.DATABASE_NAME
const DBPORT = process.env.DATABASE_PORT

const app : Application = express()

const corsOptions: CorsOptions = {};

//enable cors to send and receive things from frontend
app.use(cors())
//Use express body parser 
app.use(express.json())
//use routes 
app.use(router);

mongoose.connect('mongodb://127.0.0.1:' + DBPORT + '/' + DBNAME)
  .then(() => {  
    console.log('Database Connected!'); 
    app.listen(8080, () => console.log('Node Api app is running on port 8080'));
  });

export const server = app;