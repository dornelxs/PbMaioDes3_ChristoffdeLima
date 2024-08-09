import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/', eventRoutes);


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

if (!dbUser || !dbPassword) {
  console.error('Database credentials are missing in the .env file.');
  process.exit(1);
}

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vvkly.mongodb.net/`)
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o MongoDB:', err.message);
  });

  export default app;