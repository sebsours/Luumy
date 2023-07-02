import express from 'express';
import axios from 'axios';

import User from '../schemas/User.js';
import Album from '../schemas/Album.js';
import authenticateToken from '../authentication/authToken.js';
import { getAuth } from './spotify.js';

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
    try {

        const albumExists = await Album.findOne({ spotifyID: req.body.spotifyID, userID: req.user.id });

        // console.log(albumExists);

        if (!albumExists) {
            const album = new Album({
                userID: req.user.id,
                spotifyID: req.body.spotifyID,
                favoriteTrack: req.body.favoriteTrack,
                score: req.body.score,
                notes: req.body.notes,
            });

            await album.save();

            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $push: { albumList: album } },

            );

            res.status(200).send(album);
        }
        else {
            throw new Error("Album already in list");
        }




    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/getAlbums', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        const spotifyToken = await getAuth();

        const result = [];

        await Promise.all(user.albumList.map(async (albumID) => {

            const album = await Album.findById(albumID);
            await axios.get(`https://api.spotify.com/v1/albums/${album.spotifyID}`, {
                headers: {
                    'Authorization': 'Bearer ' + spotifyToken
                }
            })
                .then((response) => {
                    result.push({
                        favoriteTrack: album.favoriteTrack,
                        score: album.score,
                        notes: album.notes,
                        spotifyID: album.spotifyID,
                        image: response.data.images[0].url,
                        name: response.data.name,
                        artistName: response.data.artists[0].name
                    })
                })
                .catch((error) => {
                    console.log(error);
                })



        }));

        res.send(result);

    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

router.delete('/deleteAlbum', authenticateToken, async (req, res) => {
    // Remove from the user album list array
    // Remove from album document
    try {
        const album = await Album.findOneAndDelete({ userID: req.user.id, spotifyID: req.body.spotifyID });

        await User.findOneAndUpdate({ username: req.user.username }, {
            $pull: {
                albumList: album._id,
            }
        });

        res.status(200).send("Ok");

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.put('/editAlbum', authenticateToken, async (req, res) => {
    try {
        // edit album's favorite track, score, or notes
        const update = {
            favoriteTrack: req.body.favoriteTrack,
            score: req.body.score,
            notes: req.body.notes
        }
        await Album.findOneAndUpdate({ userID: req.user.id, spotifyID: req.body.spotifyID }, update);

        res.status(200).send("Ok");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


export default router;