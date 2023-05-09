const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config({ path: '../../.env'});

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(client_id + ":" + client_secret, 'utf-8').toString('base64');

// Get the access_token to access the other spotify APIs
const getAuth = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    try
    {
        const response = await axios.post(url, {
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Authorization': 'Basic ' + auth_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return response.data.access_token;
    } catch(error)
    {
        console.log(error);
    }
};



const searchAlbums = async (query) => {
    // console.log(query);
    const url = 'https://api.spotify.com/v1/search?q=' + query + '&type=album';
    try
    {
        const response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + await getAuth(),
                'Content-Type': 'application/json'
            }
        })
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

export {searchAlbums}
