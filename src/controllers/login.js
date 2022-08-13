import { Router } from "express";
//import { uuid4 as v4 } from "uuid";


const router = Router();

router.post("/", (req, res) => {
    res.send("OK");
});

export default router;
