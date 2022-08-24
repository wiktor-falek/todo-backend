import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    _id: {
        type: Number
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
});

export default todoSchema;