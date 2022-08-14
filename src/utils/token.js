import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; dotenv.config();

const SECRET = process.env.JWT_SECRET;

/**
 * @param {String} id 
 * @param {Number} registrationTimestamp 
 */
export const encode = (id, registrationTimestamp) => {
    let payload = { id, registrationTimestamp };
    const token = jwt.sign(payload, SECRET, { expiresIn: 86400 });
    return token;
}

export const decode = (token) => {
    let decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
}