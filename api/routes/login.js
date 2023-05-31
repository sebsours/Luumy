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

router.post('/', async (req, res) => {

    try {
        // req.body.username, req.body.password
        // Find the username, if you can't find the username then it doesn't exist in the database and it will throw an error
        // If you find the username, compare passwords to authenticate the users.
        const user = await User.findOne({ username: req.body.username });
        // console.log(user);
        if (!user) {
            throw new AuthError("User not found", 401);
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            throw new AuthError("Password does not match", 401);
        }

        // delete req.body.password;
        // console.log(req.body.password);
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
            expiresIn: '1h'
        });


        res.status(200).json({ userInfo, token });

    } catch (error) {
        res.status(error.statusCode).send(error.message);
        // console.log(error.statusCode);
    }

});



export default router;