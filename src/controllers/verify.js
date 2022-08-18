import { Router } from "express";
import { param, validationResult } from "express-validator";

import { User } from "../models/User.js";
import { decode } from "../utils/token.js";


const router = Router();


router.get("/", (req, res) => {
    res.status(200).json({ "where": "token" });
})

router.get("/:token", 
    param("token").isString().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        } 

        const token = req.params.token;

        let tokenData;
        try {
            tokenData = decode(token);
        }
        catch(err){
            console.log(err)
            return res.status(400).json({ error: "invalid token" })
        }
        
        if (tokenData === undefined || tokenData === null) {
            return res.status(400).json({ error: "invalid token" });
        }

        let { id, registrationTimestamp } = tokenData;
        const query = { 
            "account.registrationTimestamp": registrationTimestamp,
            "_id": id
        };
        const user = await User.findOne(query).select("account");
        
        console.log(user);

        if (user.account.confirmedEmail !== null) {
            // if user already confirmed email;
            return res.status(400).json({ error: "email is already verified" });
        }
        // confirm email
        user.account.confirmedEmail = user.account.email;

        await user.save();

        res.status(200).json(tokenData);
})

export default router;
