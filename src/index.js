import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { default as register } from "./controllers/register.js";
import { default as login } from "./controllers/login.js";
import makeDir from "./utils/makeDir.js";


// INIT
const app = express();
const NODE_ENV = process.env.NODE_ENV === "production"? "production" : "development";


// MIDDLEWARE
app.use(cors({
    origin: "*" // auth.gamename.com
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
app.use("/register", register);
app.use("/login", login);

app.use("/", express.static(makeDir("/views/public"), { extensions: ["html", "css", "ico"] }));


// MONGOOSE INIT
let mongoURI
if (NODE_ENV === "production") {
    mongoURI = process.env.MONGO_URI;
}
else {
    mongoURI = "mongodb://127.0.0.1:27017/game";
}

mongoose.connect(mongoURI);


// SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.table({ NODE_ENV, mongoURI, URL: `http://localhost:${PORT}`});
});

