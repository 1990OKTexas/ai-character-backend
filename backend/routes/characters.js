import express from 'express';
const router = express.Router();

import Character from '../models/Character.js';

// Create character (requires login)
router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You must be logged in to create a character.' });
  }

  try {
    const { name, sex, hashtags, sfw, description, starter, image } = req.body;

    const newChar = new Character({
      name,
      sex,
      hashtags,
      nsfw: sfw,
      description,
      starter,
      image,
      createdBy: req.session.user.id
    });

    await newChar.save();
    res.status(201).json({ message: 'Character created successfully' });
  } catch (err) {
    console.error('Character creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Optionally: get all characters
router.get('/', async (req, res) => {
  const characters = await Character.find().sort({ createdAt: -1 });
  res.json(characters);
});

export default router;
