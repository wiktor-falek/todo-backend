import { User } from "../models/User.js";

const authorize = async (req, res, next) => {
    const { username, sessionId } = req.cookies;

    if (!username || !sessionId) {
        return res.status(400).json({
            status: 400,    
            message: "Bad Request"
        });
    }

    const query = { "account.username" : username, "account.sessionId": sessionId };
    const userExists = await User.exists(query);

    if (userExists) {
        return next();
    }

    return res.status(401).json({
        status: 401,
        message: "Unauthorized"
    });

}

export default authorize;