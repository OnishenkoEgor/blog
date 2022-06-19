const express = require('express')
const config = require('config')
const mongoosee = require('mongoose')
const app = express();
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const postRoutes = require('./routes/post.routes');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use('/auth', authRoutes);
app.use('/users',usersRoutes)
app.use('/posts',postRoutes)

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

