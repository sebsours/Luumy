import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import spotify_apis from "./routes/spotify.js";
import signup_api from "./routes/signup.js";
import login_api from "./routes/login.js";


dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the Luumy database!");
    } catch (error) {
        console.log("Could not connect to database. Error message:\n", error);
    }
}

connectDB();

const app = express();



const port = process.env.PORT;
// const spotify_token_data = await getAuth();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// endpoints that use the spotify api
app.use("/spotify", spotify_apis);
app.use("/signup", signup_api);
app.use("/login", login_api);

// app.get('/', (req, res) => {
//     res.send('OMG IS THIS SHIT ACTUALLY WORKING?');
// })

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
    // console.log(`Access token is: ${spotify_token_data.access_token}`);
})