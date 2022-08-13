import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

import { User } from "../models/User.js";


const router = Router();

router.post(
    "/", 
    body('username').isString().trim().isLength({ min: 6, max: 30 }),
    body('password').isString().isLength({ min: 8, max: 100 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const { username, password } = req.body;

        User.findOne({ "username": username }).exec()
        .then(user => {
            let hash = user.account.hash;
            return bcrypt.compare(password, hash);
        })
        .catch(err => {
            res.status(400).json({error: "Username not found"});
        })
        .then(authenticated => {
            if (!authenticated) {
                return undefined;
                //throw "Wrong password"
            }

            let filter = { "username": username }
            const sessionId = uuidv4();
            return User.findOneAndUpdate(filter, { "account.sessionId": sessionId }, { new: true }).exec();
        })
        .catch(err => { 
            return res.status(400).json({error: "Wrong username"});
        })
        .then((user) => {
            let sessionId = user.account.sessionId;

            res.cookie("username", username, {
                maxAge: 2629800, // 1 month
            })
            res.cookie("sessionId", sessionId, {
                maxAge: 2629800, // 1 month
            })

            res.status(200).json({ username, sessionId }); 
        })
});

export default router;
