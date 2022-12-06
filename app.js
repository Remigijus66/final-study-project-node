const express = require("express")
const cors = require("cors")
const app = express()
const mainRouter = require('./router/mainRouter')
const mongoose = require("mongoose")
require("dotenv").config()
const colors = require('colors')
const session = require('express-session')
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log(`ALL GOOD DATABASE CONNECTED`.bgCyan)
    }).catch((e) => {
        console.log(`ERROR:  ${e}`.bgRed)
    })

const http = require("http").createServer(app)
const socketIo = require("socket.io")
const socketRouter = require('./modules/socketRouter')
const io = socketIo(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})



http.listen(port, () => console.log(`Server online on port ${port}`.bgYellow.bold))
app.use(session({
    secret: 'any',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
})
);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
app.use(express.json())
app.use('/', mainRouter)
app.set('socketio', io);
socketRouter(io)





