import Model from '../models/index.js'


const addData = (data) => {
    try {
        return Model(data).save()
    }
    catch (error) {
        console.log(error)
    }
}


export default addData