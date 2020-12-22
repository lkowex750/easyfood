const {create,getUsers,getUserbyID,getUserbyUsername} = require("./user.service")
const { genSaltSync, hashSync, compareSync} = require('bcrypt')

module.exports ={
    createUser: (req, res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body,(err, results) =>{
            if (err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message : "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data : results
            })
        })
    },
    getUsers: (req,res)=>{
        getUsers((err, results)=> {
            if (err){
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                data : results
            })
        })
    },
    getUserbyID: (req,res) =>{
        const id = req.params.id
        getUserbyID(id,(err, results)=>{
            if (err){
                console.log(err)
                return
            }
            if (!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data : results
            })

        })
    },

    login: (req,res) =>{
        const body = req.body
        getUserbyUsername(body.username,(err ,results)=>{
            if(err){
                console.log(err)
            }
            if (!results){
                return res.json({
                    success: 0,
                    message : "invalid username or password"
                })
            }
            const result = compareSync(body.password,results.password)
            if(!result){
                return res.json({
                    success: 0,
                    message: "invalid password"
                })
            }
            else{
                getUserbyID(results.user_ID,(error,result)=>{
                    if(error){
                        return res.json({
                            success: 0,
                            message : "something wrong"
                        })           
                    }
                    return res.json({
                        success: 1,
                        data: result
                    })
                })
            }
            
        })


    }

}