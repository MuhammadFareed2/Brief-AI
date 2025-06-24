import mongoose, { Schema } from 'mongoose'

const dataSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Model = mongoose.model('User', dataSchema)

export default Model