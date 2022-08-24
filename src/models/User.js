import mongoose from "mongoose";

import userAccountSchema from "./userAccountSchema.js";
import todoSchema from "./todoSchema.js";


const userSchema = new mongoose.Schema({
    account: userAccountSchema,
    todos: [todoSchema]
});

const User = mongoose.model('users', userSchema);

export { User };