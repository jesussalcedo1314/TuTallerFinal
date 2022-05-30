const express = require('express')
require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const corsOptions = {
    exposedHeaders: 'authorization',
}

const app = express()
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

app.use(express.static('./public'));
app.use(express.json())
app.use(cors(corsOptions))

const authRouter = require('./routes/auth')
const talleresRouter = require('./routes/talleres')
const usersRouter = require('./routes/users')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/talleres', authenticateUser, talleresRouter)

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
    res.status(201).send('<h1>TuTaller</h1>')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listening on port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}
start()