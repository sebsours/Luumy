import express from 'express';
import axios from 'axios';

import User from '../schemas/User.js';
import Album from '../schemas/Album.js';
import authenticateToken from '../authentication/authToken.js';
import { getAuth } from './spotify.js';


// const buildSpotifyString = async (user) => {
//     let allSpotifyIDs = '';
//     // The spotify limits only 20 spotify ids per call. Need to find a way to 
//     // satisfy this.
//     await Promise.all(user.albumList.map(async (album, index) => {

//         const albumObject = await Album.findById(album);
//         // console.log(albumObject);
//         allSpotifyIDs += albumObject.spotifyID;
//         allSpotifyIDs += ',';
//         // console.log(allSpotifyIDs);
//     }));

//     allSpotifyIDs = allSpotifyIDs.slice(0, -1);

//     return allSpotifyIDs;
// }

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
    try {
        const album = new Album({
            userID: req.user.id,
            spotifyID: req.body.spotifyID,
            favoriteTrack: req.body.favoriteTrack,
            score: req.body.score,
            notes: req.body.notes,
        });

        await album.save();

        // Find a way to check for duplicates based on the spotifyID
        //already checking for duplciates?
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { albumList: album } },

        );


        // console.log(req.user.id);
        res.status(200).send(album);

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
})


export default router;