import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../../models/User.js";
import { encode } from "../../utils/token.js";
import { sendConfirmationEmail } from "../../components/email.js";

const router = Router();

router.post("/register",
    body('username').isString().trim().isLength({ min: 6, max: 30 }),
    body('password').isString().isLength({ min: 8, max: 100 }),
    body('email').isString().isLength({ min: 6, max: 254 }).normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }

        const { username, password, email } = req.body;

        // check if there is no user that already has confirmed this email
        const query = { "account.confirmedEmail": email };
        const userWithEmailTaken = await User.findOne(query).select("account");

        if (userWithEmailTaken) {
            return res.status(400).json({
                param: "email",
                message: "Email is already in use"
            });
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

        console.log(JSON.stringify(newUser));

        try {
            await newUser.save()
        }
        catch(e) {
            return res.status(400).json({
                param: "username",
                message: "Username is taken",
            });
        }

        const user = await User.findOne({ "account.username": username });
        
        // generate token
        const id = user.id;
        const registrationTimestamp = user.account.registrationTimestamp;
        const token = encode(id, registrationTimestamp);

        // send email
        sendConfirmationEmail(
            email,
            'Please confirm your email address',
            `Hi ${username}, Click here to confirm your email address and activate your account\n` +
            `https://todoapi-dfk7.onrender.com/auth/verify/${token}` 
        );

        res.status(200).json({ username, email });
});

export default router;
