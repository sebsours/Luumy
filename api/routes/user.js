import express from 'express'
import User from '../schemas/User.js'
import authenticateToken from '../authentication/authToken.js';

const router = express.Router();

// Finds if a user exists in database from a provided username
router.post('/findUser', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(200).send(user);
        }
        else { throw Error("No user found") }

    } catch (error) {
        // No user found
        console.log(error);
        res.status(404).send("No user found");
    }


});

// Gets the current logged in user based on the authentication token
router.get('/getCurrentUser', authenticateToken, async (req, res) => {
    try {
        const currentUser = req.user;
        res.status(200).json(currentUser);

    } catch (error) {
        // Error would come from the authenticateToken middleware, so it probably
        // wouldn't reach here in this catch block
        res.status(400).end();
    }
});


export default router;