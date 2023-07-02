import express from 'express'
import User from '../schemas/User.js'

const router = express.Router();

router.post('/findUser', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(200).send(user);
        }
        else { throw Error("No user found") }

    } catch (error) {
        console.log(error);
        res.status(404).send("No user found");
    }


});


export default router;