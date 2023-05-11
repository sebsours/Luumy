import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import spotify_apis from "./routes/spotify.js";
dotenv.config();

const app = express();



const port = process.env.PORT;
// const spotify_token_data = await getAuth();

app.use(cors());
app.use(express.json());

// endpoints that use the spotify api
app.use("/spotify", spotify_apis);

app.get('/', (req, res) => {
    res.send('OMG IS THIS SHIT ACTUALLY WORKING?');
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
    // console.log(`Access token is: ${spotify_token_data.access_token}`);
})