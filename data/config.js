const knex = require("knex")

const config = require("../knexfile")

const db = knex(config.development)

module.exports = {
    find,
    findById,
    add,
    findBy,
}

function find() {
    return db("users")
}

function add(user){
    return db("users").insert(user)
    
}

function findById(id){
    return db("users")
        .select("id", "username")
        .where({id})
        .first()
}

function findBy(filter){
    return db("users")
        .select("id","username","password")
        .where(filter)
}