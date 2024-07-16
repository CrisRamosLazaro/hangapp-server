import mongoose from "mongoose"

const MONGO_URI: string = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/HangApp"

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        const dbName: string = x.connections[0].name
        console.log(`Connected to Mongo!🚀 Database name: "${dbName}"`)
    })
    .catch((err: any) => {
        console.error("Error connecting to mongo: ", err)
    })