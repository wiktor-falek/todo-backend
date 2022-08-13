import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { default as register } from "./controllers/register.js";
import { default as login } from "./controllers/login.js";


const NODE_ENV = process.env.NODE_ENV === "production"? "production" : "development";

const app = express();

app.use(cors({
    origin: "*" // auth.gamename.com
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
app.use("/register", register);

let mongoURI
if (NODE_ENV === "production") {
    mongoURI = process.env.MONGO_URI;
}
else {
    mongoURI = "mongodb://127.0.0.1:27017/game";
}

mongoose.connect(mongoURI);

const PORT = 3000;

app.listen(PORT, () => {
    console.table({ NODE_ENV, mongoURI, });
    console.log("Auth Server is running");
    console.log(`http://localhost:${PORT}`);
});

