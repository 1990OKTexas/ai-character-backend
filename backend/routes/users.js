import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; 
// your Mongoose model

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password, nickname } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      nickname
    });

    await newUser.save();
    res.status(201).json({ message: 'User created' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
