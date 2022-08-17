import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

import { User } from "../models/User.js";


const router = Router();

router.post("/",
    body('username').isString().trim().isLength({ min: 6, max: 30 }),
    body('password').isString().isLength({ min: 8, max: 100 }),
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        const query = { "account.username" : username };

        const user = await User.findOne(query).select("account");

        if (user === null) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const hash = user.account.hash;
        const authenticated = await bcrypt.compare(password, hash);

        if (!authenticated) {
            return res.status(400).json({ error: "Invalid password" });
        }

        user.account.sessionId = uuidv4();
        const sessionId = user.account.sessionId;

        await user.save()
        .then(() => {
            const cookieMaxAge = 2629800 // 1 month
            res.cookie("username", username, {
                maxAge: cookieMaxAge,
            })
            res.cookie("sessionId", sessionId, {
                maxAge: cookieMaxAge,
            })
            res.status(200).json({ username, sessionId });
            //res.redirect(`https://game.com/`);
        })
});

export default router;
