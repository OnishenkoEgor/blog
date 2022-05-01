const express = require('express')
const config = require('config')
const mongoosee = require('mongoose')
const parser = require('body-parser')
const app = express();
let authRoutes = require('./routes/auth.routes');

app.use(parser.json())
app.use(parser.urlencoded({
    extended: true
}));

app.use('/auth', authRoutes);

const PORT = config.get('port') || 8001

async function start() {
    try {
        await mongoosee.connect(config.get('mongoUri'))
        app.listen(PORT, () => {
            console.log(`App started on port - ${PORT}`)
        })
    } catch (e) {
        console.error('Error in start function : ', e.message)
        process.exit(1)
    }
}

start()

