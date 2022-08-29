import express from "express";
import mongoose from "mongoose";
import winston from "winston";
import expressWinston, { logger } from "express-winston";
import cookieParser from "cookie-parser";

import { default as register } from "./src/controllers/auth/register.js"
import { default as login } from "./src/controllers/auth/login.js"
import { default as verify } from "./src/controllers/auth/verify.js"
import { default as v1 } from "./src/controllers/v1/v1.js";

import { authApiLimiter } from "./src/utils/rateLimit.js";
import makeDir from "./src/utils/makeDir.js";
import authorize from "./src/middleware/authorize.js";

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
    // logs params from request body if not empty, omitting blacklistedKeys
    const blacklistedKeys = ["password",];

    const params = JSON.parse(JSON.stringify(req.body));
    next();
    if (Object.keys(params).length) {
        const data = Object.assign(params);
        blacklistedKeys.forEach((key) => {
            if (key in data) {
                data[key] = "[REDACTED]";
            }
        })
        console.log({ params: data });
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
    mongoURI = `mongodb+srv://apdo:${process.env.MONGO_PASS}@cluster0.cfhemkl.mongodb.net/?retryWrites=true&w=majority`;
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

