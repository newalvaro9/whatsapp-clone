import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

const connect = () => {
    mongoose.connect(process.env.DB_URL as string)
    .then(db => console.log('Conectado a MongoDB'))
    .catch(err => console.error(err))
}

export default connect;