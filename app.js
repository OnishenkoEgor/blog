const express = require('express')
const config = require('config')
const mongoosee = require('mongoose')

const app = express()

app.use('api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

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

