import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../schemas/User.js'
import authenticateToken from "../authentication/authToken.js";
class AuthError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const router = express.Router();
dotenv.config();

// Logs in a user from a provided username and password
router.post('/', async (req, res) => {

    try {
        // Find the username, if you can't find the username then it doesn't exist in the database and it will throw an error
        // If you find the username, compare passwords to authenticate the users.
        if (!req.body.password) {
            throw new AuthError("No password provided", 400);
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            throw new AuthError("User not found", 404);
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            throw new AuthError("Incorrect password", 401);
        }

        const userInfo = {
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            albumList: user.albumList,
            id: user._id
        }

        // send the user object back with a jwt token
        // payload can be accessed throw jwt.verify(token, process.env.ACCESS_TOKEN)
        const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN, {
            expiresIn: '1hr'
        });

        await res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 // 1hr
        });

        res.status(200).json({ userInfo });

    } catch (error) {
        res.status(error.statusCode).send(error.message);
    }

});

// Logs out a user based on authentication token
router.get('/logout', authenticateToken, async (req, res) => {
    try {
        res.clearCookie('token').end();
    } catch (error) {
        // Error would come from the authenticateToken middleware, so it probably
        // wouldn't reach here in this catch block
        res.status(400).end();
    }
});



export default router;