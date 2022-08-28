import { User } from "../models/User.js";


/**
 * checks if user with username and sessionId cookie exists
 * if unsuccessfull returns status 40x message breaking the middleware chain
 * if successfull passes { username, sessionId, userId } to succeeding middlewares 
 * 
 * EXAMPLE AUTHORIZED ROUTE
 * app.use("/api", authorize, v1: express.Router);
 * 
 * EXAMPLE USAGE INSIDE NEXT MIDDLEWARE: 
 * const { username, sessionId, userId } = res.locals;
 */
const authorize = async (req, res, next) => {
    const { username, sessionId } = req.cookies;

    if (!username || !sessionId) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    const query = { "account.username" : username, "account.sessionId": sessionId };

    const user = await User.findOne(query).select("_id").lean();
    
    if (user) { // authorized
        // pass session data and userId to succeeding middlewares
        res.locals.username = username;
        res.locals.sessionId = sessionId;
        res.locals.userId = user._id.toString();
        return next();
    }

    return res.status(401).json({
        message: "Unauthorized"
    });
}

export default authorize;