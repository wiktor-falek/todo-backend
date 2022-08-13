import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";


const router = Router();

router.post(
    "/", 
    body('username').isString().trim().isLength({ min: 6, max: 30 }),
    body('password').isString().isLength({ min: 8, max: 100 }),
    body('email').isString().isLength({ min: 6, max: 254 }).normalizeEmail(),
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
            let errorData = parse(err);
            res.status(400).json(errorData);
        });
});

export default router;
