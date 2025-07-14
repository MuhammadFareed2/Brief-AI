// services/register.js

import addData from '../db/register.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const registerUser = async (data) => {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    data.password = hashedPassword;

    // Save user to DB
    const savedUser = await addData(data);

    // Generate JWT — NO expiry
    const token = jwt.sign(
        { id: savedUser._id },
        process.env.JWT_SECRET
    );

    return {
        user: savedUser,
        token: token,
    };
};

export default registerUser;
