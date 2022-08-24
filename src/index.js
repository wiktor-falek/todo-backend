import express from "express";
import mongoose from "mongoose";
import winston from "winston";
import expressWinston, { logger } from "express-winston";
import cookieParser from "cookie-parser";

import { default as register } from "./controllers/auth/register.js"
import { default as login } from "./controllers/auth/login.js"
import { default as verify } from "./controllers/auth/verify.js"
import { default as v1 } from "./controllers/v1/v1.js";

import { authApiLimiter } from "./utils/rateLimit.js";
import makeDir from "./utils/makeDir.js";
import authorize from "./middleware/authorize.js";

// INIT
const app = express();
const NODE_ENV = process.env.NODE_ENV === "production"? "production" : "development";


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
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
app.use((req, res, next) => {
    // logs params from request body if not empty
    const params = JSON.parse(JSON.stringify(req.body));
    next();
    if (Object.keys(params).length) {
        console.log(params);
    }
});

// RATE LIMITERS
app.use("/auth", authApiLimiter);

// ROUTES
app.use("/auth", register, login, verify);
app.use("/api", authorize, v1);

// MONGOOSE INIT
let mongoURI;
if (NODE_ENV === "production") {
    mongoURI = process.env.MONGO_URI;
}
else {
    mongoURI = "mongodb://127.0.0.1:27017/todo";

    // routes for local testing purposes
    app.use("/", express.static(makeDir("/views/public"), { extensions: ["html", "css", "js", "ico"] }));
}

mongoose.connect(mongoURI);


// SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.table({ NODE_ENV, mongoURI, URL: `http://localhost:${PORT}`});
});

