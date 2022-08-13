import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
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
        unique: true,
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
        required: false,
    },

    confirmedEmail: {
        type: Boolean,
        default: false
    }
});

export default userAccountSchema;
