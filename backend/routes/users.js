import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, nickname, profilePicture } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      nickname,
      profilePicture
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      nickname: newUser.nickname,
      profilePicture: newUser.profilePicture
    };

    return res.status(201).json({ message: 'Signup and login successful' });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get current logged-in user
router.get('/me', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json({ message: 'Not logged in' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out' });
  });
});

export default router;
