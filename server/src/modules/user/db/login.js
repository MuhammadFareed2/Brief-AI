import Model from '../models/index.js'

const getData = async (email) => {
    try {
        const user = await Model.findOne({ email: email })
        return user
    }
    catch (error) {
        console.log(error)
    }
}

export default getData