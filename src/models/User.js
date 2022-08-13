import mongoose from "mongoose";

import userAccountSchema from "./userAccountSchema.js";


const userSchema = new mongoose.Schema({
    account: userAccountSchema
});

const User = mongoose.model('users', userSchema);

export { User };