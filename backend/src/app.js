import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserModel from './models/user.model.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors({
  origin: process.env.DOMAIN_FRONTEND,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter({ UserModel }));

export default app;