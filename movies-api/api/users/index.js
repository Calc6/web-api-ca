import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: "User created successfully." });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "An error occurred during signup." });
    }
  });
  
  

// Authenticate User
router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUserName(username);
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
  const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
  res.status(200).json({ success: true, token });
}));

export default router;