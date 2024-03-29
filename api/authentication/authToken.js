import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateToken(req, res, next) {

    // const authHeader = req.headers.authorization;
    // // token can either be null if there's no authHeader or 
    // // get the token from the Authorization header
    // const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //     return res.sendStatus(401);
    // }

    // jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     req.user = user;
    //     next();
    // });
    const token = req.cookies.token;
    try {
        if (!token) throw Error("No token found");

        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send(err);

    }

}

