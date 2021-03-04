const express = require("express")
const server = express()
const cors = require("cors")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const userRouter = require("./users/users-router")
const connection = require("./data/connection")
const port = process.env.PORT || 5000

server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it safe",
    store: new KnexSessionStore({
        knex: connection,
        createtable: true
    })
}))



server.use("/api", userRouter)

server.listen(port, () => {
    console.log("Server running at port: 5000")
})