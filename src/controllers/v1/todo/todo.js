import { Router } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../../../models/User.js";
import { Todo } from "../../../models/Todo.js";
import { decode } from "../../../utils/token.js";


const router = Router();


// Responds with an array of todos of the user
router.get("/todo", 
    async (req, res) => {
    const { sessionId, username } = req.cookies
    console.table({ sessionId, username });

    const query = { "account.username" : username };
    const user = await User.findOne(query).select("todos");

    if (user === null) {
        res.status(404).json({ "error": "user was not found" });
    }

    const todos = user.todos;
    res.json({ todos });
})

// Responds with an todo of the user that matches the id
router.get("/todo/:id", 
    async (req, res) => {
        const id = req.params.id;
        if (id === undefined || id == null) {
            return res.status(40).json({ error: "id not specified" });
        }

        const { sessionId, username } = req.cookies;

        const query = { "account.username" : username, };

        const user = await User.findOne(query).select("todos");

        const result = user.todos.filter(todo => todo.id === id);

        if (result.length === 0) {
            return res.status(400).json({ error: "todo not found" });
        }
        res.json({ result });
})

// Creates a new todo
router.post("/todo", 
    body('id').notEmpty().isString(),
    body('title').notEmpty().isString().isLength({ max: 50 }),
    body('body').notEmpty().isString().isLength({ max: 500 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }

        const { id, title, body } = req.body;
        const { sessionId, username } = req.cookies

        const query = { "account.username" : username };
        const user = await User.findOne(query).select("todos");

        console.log(user);
        
        const todo = new Todo({ id, title, body });
        user.todos.push(todo);
        
        try {
            await user.save();
        }
        catch(e){
            console.log(e)
            return res.status(400).json({
                status: "something went wrong (very descriptive message)"
            });
        }
        res.status(200).json(todo);
})

// Replaces a todo at id
router.put("/todo", (req, res) => {
    
})

// Modifies a todo at id
router.patch("/todo", (req, res) => {
    
})

export default router;