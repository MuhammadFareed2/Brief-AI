import getData from '../db/login.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import "dotenv/config"

const loginUser = async (data) => {
    try {
        const user = await getData(data.email)


        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password)

        if (isPasswordCorrect) {
            var token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)

            // return {
            //     ...user,
            //     token: token
            // }

            return {
                user,
                token: token
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

export default loginUser