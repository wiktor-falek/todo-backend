import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";
import { encode } from "../utils/token.js";


const router = Router();

router.post("/", 
    body('username').isString().trim().isLength({ min: 6, max: 30 }),
    body('password').isString().isLength({ min: 8, max: 100 }),
    body('email').isString().isLength({ min: 6, max: 254 }).normalizeEmail(),
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const { username, password, email } = req.body;

        console.table({username, password, email})
        // check if there is no user that has confirmed
        // the email that we are trying to create account with
        const query = { "account.confirmedEmail": email };
        const userWithEmailTaken = await User.findOne(query).select("account");

        if (userWithEmailTaken) {
            res.status(400).json("Email is already in use");
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            account: {
                username: username,
                hash: hash,
                email: email,
                registrationTimestamp: Math.floor(Date.now() / 1000)
            }
        });

        try {
            await newUser.save()
        }
        catch {
            return res.status(400).json({ error: "Username is taken" });
        }

        
        const user = await User.findOne({ "account.username": username });
        
        // generate token
        const id = user.id;
        const registrationTimestamp = user.account.registrationTimestamp;
        console.log(id, registrationTimestamp);
        const token = encode(id, registrationTimestamp);

        // send email

        res.status(200).json({ username, email, token });
});

export default router;
