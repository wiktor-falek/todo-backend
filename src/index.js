import express from "express";
import mongoose from "mongoose";
import winston from "winston";
import expressWinston from "express-winston";

import { default as register } from "./controllers/register.js";
import { default as login } from "./controllers/login.js";
import { default as verify } from "./controllers/verify.js";
import { apiLimiter } from "./utils/rateLimit.js";
import makeDir from "./utils/makeDir.js";


// INIT
const app = express();
const NODE_ENV = process.env.NODE_ENV === "production"? "production" : "development";


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    level: "info",
    ignoreRoute: function (req, res) { return false; }
}));

app.use("/login", apiLimiter);
app.use("/register", apiLimiter);
app.use("/verify", apiLimiter);


// ROUTES
app.use("/register", register);
app.use("/login", login);
app.use("/verify", verify);

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

