import express from 'express';
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Users route working!');
});

// Add your user-related routes here

export default router;
