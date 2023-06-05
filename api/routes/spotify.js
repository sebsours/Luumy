// PUT ALL DYNAMIC ROUTES AT THE BOTTOM so things dont break
import axios from "axios";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(client_id + ":" + client_secret, 'utf-8').toString('base64');

// Get the access_token to access the other spotify APIs
// !! NOTE access token expires after 1 hour
const getAuth = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    try {
        const response = await axios.post(url, {
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Authorization': 'Basic ' + auth_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        // console.log(response.data);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
};

router.get('/search/:query', async (req, res, next) => {
    // res.send(`Trying to find: ${req.params.query}`);
    const url = 'https://api.spotify.com/v1/search?q=' + req.params.query + '&type=album';
    // res.send('Bearer ' + await getAuth());
    await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + await getAuth(),
            'Content-Type': 'application/json'
        }
    })
        .then(response => res.send(response.data))
        .catch(error => console.log(error));
    // res.send(`Searching for... ${req.params.query}`);
});

router.get('/albumTracks/:albumID', async (req, res, next) => {
    const url = 'https://api.spotify.com/v1/albums/' + req.params.albumID;
    await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + await getAuth(),
            'Content-Type': 'application/json'
        }
    })
        .then(response => res.send(response.data))
        .catch(error => console.log(error));
});

export default router;