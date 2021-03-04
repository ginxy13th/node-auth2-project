const express = require("express")
const bcrypt = require("bcryptjs")
const usersMiddleware = require("./users-middleware")
const router = express.Router()
const usersMiddle = require("./users-middleware")
const db = require("../data/config")
const { orWhereNotExists } = require("../data/connection")

router.get("/users", usersMiddle.restrict(), (req,res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/users/register", (req,res) => {
    if (req.body){
        const rounds = process.env.BCRYPT_ROUNDS || 4
        const hash = bcrypt.hashSync(req.body.password, rounds)
        req.body.password = hash

        db.add(req.body)
        .then(res.status(200).json(req.body))
        .catch(err => {
            console.log(err)
        })
    } else {
        res.status(400).json({message: "Invalid info!"})
    }
})

router.post("/users/login", async (req,res,next) => {
    try {
        const {username, password} = req.body
        const user = await db.findBy({username}).first()

    if(!user){
        return res.status(401).json({message: "Invalid cred"})
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if(!passwordValid){
        return res.status(401).json({message:"Invalid cred"})
    }
    req.session.user = user

    res.json({message: `Welcome ${user.username}`})
    } catch (err){
        next(err)
    }
})

router.get("/users/logout", (req,res) => {
    if(req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({message: "nope"})
            } else {
                res.status(204).end()
            }
        });
    } else {
        res.status(204).end()
    }
})

module.exports = router