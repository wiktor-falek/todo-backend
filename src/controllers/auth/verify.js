import { Router } from "express";
import { param, validationResult } from "express-validator";

import { User } from "../../models/User.js";
import { decode } from "../../utils/token.js";


const router = Router();


router.get("/verify", (req, res) => {
    res.status(200).json({ "where": "token" });
})

router.get("/verify/:token", 
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
            return res.status(400).json({ message: "Invalid token" })
        }
        
        // probably unnecessary but can never be sure
        if (tokenData === undefined || tokenData === null) {
            return res.status(400).json({ message: "Invalid token" });
        }

        let { id, registrationTimestamp } = tokenData;

        console.log(id, registrationTimestamp)

        const query = { "_id": id };
        const user = await User.findOne(query).select("account");
        console.log(user);

        if (user === null) {
            res.status(404).json({ error: "User does not exist" });
        }

        if (user.account.confirmedEmail !== null) {
            return res.status(400).json({ message: "Email is already verified" });
        }
        
        // confirm email
        user.account.confirmedEmail = user.account.email;

        await user.save();

        res.status(200).send("Your email has been confirmed");
})

export default router;
