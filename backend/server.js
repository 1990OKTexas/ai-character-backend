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
const PORT = process.env.PORT || 3000;

// Allow CORS with credentials (for session cookies)
app.use(cors({
  origin: 'https://your-frontend-url.onrender.com', // replace with your actual frontend URL
  credentials: true
}));

app.use(express.json());

// Setup session
app.use(session({
  secret: 'your-secret-key', // change this to a secure, random string
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/chat', chatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
