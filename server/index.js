import express from "express";
import "dotenv/config"
import mongoose from "mongoose";
import cors from 'cors'
import routes from "./src/routes/index.js";

const app = express()
const port = 3000


app.use(cors())

app.use(express.json())

mongoose.connect(`${process.env.DB_URL}`)

mongoose.connection.on("connected", () => {
    console.log('db connected')
})

app.use('/api', routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})