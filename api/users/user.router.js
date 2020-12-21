const {createUser, getUsers } = require('./user.controller')
const router = require("express").Router()

router.post("/",createUser)
router.get("/",getUsers)

module.exports = router