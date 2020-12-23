//const {createUser, getUsers,getUserbyID,login } = require('./user.controller')
const {getUsers,getUserbyID,login,signup} = require('./user.service')
const router = require("express").Router()


router.get("/",getUsers)
//router.get("/:id",getUserbyID)

router.post("/signup",signup)
router.post("/login",login)


module.exports = router