import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send({
            status: 403,
            message: "No authorization header provided.",
        });
    }

    const token = authorization.split(" ")[1];
    if (!process.env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is not defined in environment variables.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({
                status: 403,
                message: "Token verification failed.",
            });
        }
        console.log(user)
        req.user = user;

        next();
    });
};

export default authMiddleware;
