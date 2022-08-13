import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
    _id: false,
    username: { 
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 30,
    },
    email: { 
        type: String,
        required: true,
        minLength: 6,
        maxLength: 254
    },
    hash: { 
        type: String,
        required: true 
    },
    registrationTimestamp: { 
        type: Number,
        required: true 
    },
    sessionId: {
        type: String,
        default: null
    },

    confirmedEmail: {
        type: String,
        default: null,
        minLength: 6,
        maxLength: 254
    }
});

export default userAccountSchema;
