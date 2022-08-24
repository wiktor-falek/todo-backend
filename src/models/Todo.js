import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        //minLength: 36,
        //maxLength: 36
    },
    title: {
        type: String,
        default: "",
        maxLength: 100,
    },
    body: {
        type: String,
        default: "",
        maxLength: 256
    },
    color: {
        type: String,
    }
}, { _id: false });

const Todo = mongoose.model("todos", todoSchema);

export { Todo, todoSchema } ;