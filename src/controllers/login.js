import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

import parse from "../utils/parseMongoError.js";
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
            console.table({password, hash});
            
            return bcrypt.compare(password, hash);
        })
        .catch(err => {
            console.log(err);
            let errorData = parse(err);
            res.status(400).json(errorData);
        })
        .then(authenticated => {
            if (authenticated) {
                const sessionId = uuidv4();

                res.cookies()

                // send cookie with uuid and username
                // redirect
                res.status(200);
            }
        })
});

export default router;
