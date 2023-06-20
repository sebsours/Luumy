import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    spotifyID: {
        type: String,
        required: true,
    },
    favoriteTrack: {
        type: String,
        required: false
    },
    score: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    // For later when I figure out how to cast the genre to album
    // genre: {
    //     type: String,
    //     required: true
    // },
});

export default mongoose.model('Album', albumSchema);