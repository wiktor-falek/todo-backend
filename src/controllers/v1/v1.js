import { Router } from "express";

import { default as todo } from "./todo/todo.js";

const router = Router();

router.use("/v1", todo);

export default router; 