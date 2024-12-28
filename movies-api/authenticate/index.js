import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const router = express.Router();

// Authentication middleware
const authenticate = async (request, response, next) => {
    try { 
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error('No authorization header');

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error('Bearer token not found');

        const decoded = await jwt.verify(token, process.env.SECRET); 
        console.log(decoded);

        // Assuming decoded contains a username field
        const user = await User.findByUserName(decoded.username); 
        if (!user) {
            throw new Error('User not found');
        }
        // Optionally attach the user to the request for further use
        request.user = user; 
        next();
    } catch(err) {
        next(new Error(`Verification Failed: ${err.message}`));
    }
};

// Signup route
router.post('/signup', async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
});

// Login route
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUserName(username);
        if (!user || !user.comparePassword(password)) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
});

export { authenticate };
export default router;