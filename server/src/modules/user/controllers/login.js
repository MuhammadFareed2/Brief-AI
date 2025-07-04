import loginUser from '../services/login.js'

const loginController = async (req, res) => {
    try {
        const user = await loginUser(req.body)

        if (user) {
            res.status(200).send({
                req: req.body,
                status: 200,
                message: "Login successfully",
                loginUser: user.user,
                token: user.token
            })
            // console.log(req.headers)
        }
        else {
            res.status(401).send({
                req: req.body,
                status: 401,
                message: 'Wrong email or password'
            })
        }
        // console.log(req.headers)
    }
    catch (error) {
        res.status(500).send({
            req: req.body,
            status: 500,
            message: "Internal server error"
        })
        // console.log(error)
    }

}

export default loginController