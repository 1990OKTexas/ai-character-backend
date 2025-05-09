import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';

import userRoutes from './routes/users.js';
import characterRoutes from './routes/characters.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
  });
})
.catch(err => console.error(err));
