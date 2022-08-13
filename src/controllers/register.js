import { json, Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";


const router = Router();

router.post(
    "/", 
    body('username').trim().isLength({ min: 6, max: 30 }),
    body('password').isLength({ min: 8, max: 100 }),
    body('email').isLength({ min: 6, max: 254 }).normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const { username, password, email } = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        console.table({username, hash, email});

        const user = new User({
            account: {
                username: username,
                hash: hash,
                email: email,
                registrationTimestamp: Math.floor(Date.now() / 1000)
            }
        })

        user.save()
        .then(() => {
            res.status(200).json({ username, email });
            }   
        )
        .catch(err => {
            let errJson = JSON.parse(JSON.stringify(err));
            console.log(errJson);

            if (errJson.code === 11000) {
                // Duplicate Key Error
                let keyPattern = Object.keys(errJson.keyPattern)[0];

                let value = errJson.keyValue[keyPattern];
                let param = keyPattern.split(".")[1];
                let msg = `${param[0].toUpperCase()}${param.slice(1)} is already taken`;

                res.status(400).json({ value, msg, param });
            }

        });
});

export default router;
