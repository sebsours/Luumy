import express from 'express';
import bcrypt from 'bcrypt';

import User from '../schemas/User.js'


const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const email = req.body.email;
        const username = req.body.username;
        // Password function(req.body.password);
        const hash = await bcrypt.hash(req.body.password, 13);


        const user = new User({
            email: email,
            username: username,
            password: hash,
        });

        await user.save();
        res.status(200).send("Ok");

    } catch (error) {
        console.log(error);
        res.status(400).send();
    }







});




export default router;