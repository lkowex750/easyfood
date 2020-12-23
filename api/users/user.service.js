const pool = require("../../config/database")
const { genSaltSync, hashSync, compare, compareSync } = require('bcrypt')



module.exports = {
    /*example json 
        { 
        "username": "test3",
        "password": "test3",
        "fullName": "tester321",
        "lastName": "xx2",
        "status": 1,
        "img_profile": "abcdefg"
       }*/
    signup: (req, res) => {
        let body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        pool.query(
            "INSERT INTO `user` ( `username`, `password`, `fullName`, `lastName`, `status`, `img_profile`) VALUES (?, ?, ?, ?, ?, ?)",
            [
                body.username,
                body.password,
                body.fullName,
                body.lastName,
                body.status,
                body.img_profile
            ],
            (error, results, fields) => {
                if (error) {
                    //เช็คว่า username ซ้ำรึเปล่า
                    if (error.errno == 1062) {
                        return res.json({
                            success: 0,
                            message: "username must be unique"
                        })
                    }
                    return res.json({
                        success: 0,
                        message: error
                    })
                } else {

                    pool.query('SELECT * FROM user WHERE username = ?', [body.username], (error, results, fields) => {
                        return res.json({
                            success: 1,
                            data: results[0]
                        })
                    })
                }


            }

        )
    },
    getUsers: (req, res) => {
        pool.query('SELECT * FROM user', [], (error, results, fields) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error
                })
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },
    /*getUserbyID: (req, res)=>{
        let id = req.params.id
        pool.query('SELECT * FROM user WHERE user_ID = ?',[id],(error, results, fields)=> {
            if (error){
                return res.json({
                    success: 0,
                    message : error
                })
            }
            if(results == ""){
                return res.json({
                    success: 0,
                    message : "no data"
                })
            }
            return res.json({
                success: 1,
                data: results[0]
            })
        })
    },*/

       login:  (req, res) =>   {
        let body = req.body
          pool.query("SELECT * FROM user WHERE username = ? ", [body.username], async (error, results, fields) =>  {
            if (error) {
                return res.json({
                    success: 0,
                    message: error
                })
            }
            if (results == "") {
                return res.json({
                    success: 0,
                    message: "invalid username or password"
                })
            }
            
            
            const checkpass = await compare(body.password, results[0].password)
            //console.log(checkpass)
            if(!checkpass){
                return res.json({
                    success: 0,
                    message: "invalid password"
                })
            }else {
                return res.json({
                    success: 1,
                    data: results[0]
                })
            }
            
        })
    }




}