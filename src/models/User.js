import mongoose from "mongoose";

import accountSchema from "./accountSchema.js";
import { todoSchema } from "./Todo.js";


const userSchema = new mongoose.Schema({
    account: accountSchema,
    todos: [todoSchema]
});

const User = mongoose.model('users', userSchema);

export { User };