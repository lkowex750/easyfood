const pool = require("../../config/database")


module.exports = {
    create: (data, callback)=>{
        pool.query(
            "INSERT INTO `user` (`user_ID`, `username`, `password`, `fullName`, `lastName`, `status`, `img_profile`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
            [
                data.username,
                data.password,
                data.fullName,
                data.lastName,
                data.status,
                data.img_profile

            ],
            (error,results, fields) =>{
                if(error){
                 return  callback(error)
                }
                return callback(null,results)
            }
        )
    },
    getUsers: callback =>{
        pool.query('SELECT * FROM user',[],(error, results, fields) =>{
            if(error){
               return callback(error)
            }
            return callback(null,results)
        })
    },
    getUserbyID: (id, callback)=>{
        pool.query('SELECT * FROM user WHERE user_ID = ?',[id],(error, results, fields)=> {
            if (error){
                return callback(error)
            }
            return callback(null, results[0])
        })
    },

    getUserbyUsername: (username, callback)=>{
        pool.query("SELECT * FROM user WHERE username = ?",[username],(error, results,fields) => {
            if (error){
                return callback(error)
            }
            return callback(null, results[0])
        })
    }

    
}