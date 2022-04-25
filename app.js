const express = require('express')
const config = require('config')
const mongoosee = require('mongoose')

const app = express()
let authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes)

const PORT = config.get('port') || 5001

async function start() {
    try {
        await mongoosee.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`App started on port - ${PORT}`)
        })
    } catch (e) {
        console.error('Error in start function : ', e.message)
        process.exit(1)
    }
}

start()

