import express from 'express';

import User from '../schemas/User.js';
import Album from '../schemas/Album.js';
import authenticateToken from '../authentication/authToken.js';

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {

    try {

        const album = new Album({
            spotifyID: req.body.spotifyID,
            favoriteTrack: req.body.favoriteTrack,
            score: req.body.score,
            notes: req.body.notes,
        });

        await album.save();

        // Find a way to check for duplicates based on the spotifyID
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { albumList: album } },

        );


        // console.log(req.user.id);
        res.status(200).send(album);

    } catch (error) {
        res.send(400).send(error);
    }



});


export default router;