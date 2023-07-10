import express from 'express';
import axios from 'axios';

import User from '../schemas/User.js';
import Album from '../schemas/Album.js';
import authenticateToken from '../authentication/authToken.js';
import { getAuth } from './spotify.js';

const router = express.Router();

// Add a new album to a user's list
router.post('/add', authenticateToken, async (req, res) => {
    try {
        // To prevent duplicate data, we search if the album exists by providing the id of the album and user id
        const albumExists = await Album.findOne({ spotifyID: req.body.spotifyID, userID: req.user.id });

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
        res.status(400).send(error);
    }
});

// Get all albums in a user's list from a provided username
router.post('/getAlbums', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            throw new Error("User not found");
        }

        const spotifyToken = await getAuth();

        const result = [];
        // Loops through each album in a user's Albumlist to get the necessary data
        await Promise.all(user.albumList.map(async (albumID) => {

            const album = await Album.findById(albumID);
            // Retrieves images and name of album, and artist of the album
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
                        image: response.data.images,
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
        console.log(error);
        res.status(400).send(error);
    }
});

// Deletes an album from the user's list
router.delete('/deleteAlbum', authenticateToken, async (req, res) => {

    try {
        // Deletes the album information of that user from database
        const album = await Album.findOneAndDelete({ userID: req.user.id, spotifyID: req.body.spotifyID });

        // Removes that album's mongoID from the user's albumlist
        await User.findOneAndUpdate({ username: req.user.username }, {
            $pull: {
                albumList: album._id,
            }
        });

        res.status(200).send();

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Edits information about an album from the user
router.put('/editAlbum', authenticateToken, async (req, res) => {
    try {
        const update = {
            favoriteTrack: req.body.favoriteTrack,
            score: req.body.score,
            notes: req.body.notes
        }
        await Album.findOneAndUpdate({ userID: req.user.id, spotifyID: req.body.spotifyID }, update);

        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


export default router;