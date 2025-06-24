import addData from '../db/register.js'
import bcrypt from 'bcrypt'

const registerUser = async (data) => {

    const password = bcrypt.hashSync(data.password, 10)

    data.password = password

    return await addData(data)


}

export default registerUser