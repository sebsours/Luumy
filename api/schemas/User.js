import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    albumList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});

export default mongoose.model('User', userSchema);
