import registerUser from '../services/register.js';

const registerController = async (req, res) => {
    try {
        await registerUser(req.body)
        res.status(201).send({
            req: req.body,
            status: 201,
            message: 'User Created.'
        })
        console.log(req.body)
    }
    catch (err) {
        if (err.code == 11000) {
            res.status(405).send({
                req: req.body,
                status: 409,
                message: "Email already exists."
            })
        }
        else {
            res.status(500).send({
                req: req.body,
                status: 400,
                message: "User not created."
            })
        }
        // console.log(err.code)
    }
}

export default registerController