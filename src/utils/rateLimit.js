import { rateLimit } from 'express-rate-limit'


export const apiLimiter = rateLimit({
    windowMs: 60000,
    max: 20, // limit ip to this amount of requests per window
    standardHeaders: true,
    legacyHeaders: false,
});


