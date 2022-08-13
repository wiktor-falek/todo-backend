import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";
import makeDir from "../utils/makeDir.js";


const router = Router();

router.get("/", (req, res) => {
    res.status(200).sendFile(makeDir("../views/register.html"));
})

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

        // check if email doesnt already exist as confirmedEmail
        const query = { "account.confirmedEmail": email };
        const userWithEmailTaken = await User.findOne(query).select("account");

        if (userWithEmailTaken) {
            res.status(400).json("Email is already in use");
        }


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            account: {
                username: username,
                hash: hash,
                email: email,
                registrationTimestamp: Math.floor(Date.now() / 1000)
            }
        })

        await user.save()
        .then(() => {
            res.status(200).json({ username, email });
            }   
        )
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

export default router;
