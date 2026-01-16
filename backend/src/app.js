import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserModel from './models/user.model.js';
import BodegaModel from './models/bodega.model.js';
import ProductoModel from './models/producto.model.js';
import authRouter from './routes/auth.route.js';
import bodegaRouter from './routes/bodega.route.js';
import productoRouter from './routes/productos.route.js';

const app = express();

app.use(cors({
  origin: process.env.DOMAIN_FRONTEND,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter({ UserModel }));
app.use('/bodegas', bodegaRouter({ BodegaModel }));
app.use('/productos', productoRouter({ ProductoModel }));

export default app;