import express from 'express';
import bcrypt from 'bcrypt';

import User from '../schemas/User.js'


const router = express.Router();

// Signs up a user from a provided email, username, and password
router.post('/', async (req, res) => {

    // Validation is handled on frontend
    try {
        const email = req.body.email;
        const username = req.body.username;
        const hash = await bcrypt.hash(req.body.password, 13);

        const user = new User({
            email: email,
            username: username,
            password: hash,
        });

        await user.save();
        res.status(200).send();

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});




export default router;