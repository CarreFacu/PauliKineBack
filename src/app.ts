// app.ts
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { router } from './routes';
import db from './config/mongo';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
// Importa todas las rutas, no necesitas usar otra app.use
app.use(router);
db.then(() => console.log('Successfully connected to MongoDB.'));

export { app }; // Exporta la aplicación
