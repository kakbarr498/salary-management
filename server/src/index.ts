import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import routes from './routes';
import { initDb } from './db';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);

initDb();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
