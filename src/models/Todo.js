import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id: { // not _id cuz this shit doesn't even work properly
        type: String,
        required: true,
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