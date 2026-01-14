import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.DOMAIN_FRONTEND,
  credentials: true,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Distribuidora API');
});

export default app;