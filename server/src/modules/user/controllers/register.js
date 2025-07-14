// controllers/register.js

import registerUser from '../services/register.js';

const registerController = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        res.status(201).send({
            status: 201,
            message: 'User Created Successfully.',
            user: result.user,
            token: result.token, // ✅ Send token!
        });

        console.log("[REGISTER] User created:", result.user._id);
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).send({
                status: 409,
                message: "Email already exists.",
            });
        } else {
            console.error("[REGISTER ERROR]", err);
            res.status(500).send({
                status: 500,
                message: "Internal server error. User not created.",
            });
        }
    }
};

export default registerController;
