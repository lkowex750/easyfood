const {createUser, getUsers,getUserbyID } = require('./user.controller')
const router = require("express").Router()

router.post("/",createUser)
router.get("/",getUsers)
router.get("/:id",getUserbyID)


module.exports = router