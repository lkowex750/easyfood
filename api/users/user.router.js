const {createUser, getUsers,getUserbyID,login } = require('./user.controller')
const router = require("express").Router()

router.post("/",createUser)
router.get("/",getUsers)
router.get("/:id",getUserbyID)

router.post("/login",login)


module.exports = router