const router=require('express').Router();
const { connection } = require('../db/connection')
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const user_name = req.body.username;
    const password = req.body.password;
    const sqlogin = await "SELECT * FROM user_table WHERE user_name=? AND password=?";
    connection.query(sqlogin,[user_name, password], (error, result, fields) => {
        if(result.length>0){
            const user_id = result[0].user_id;
            const accessToken = jwt.sign({_id: user_id}, "seosaphAssignmentAuthentication")
            res.json(accessToken);
        }else{
            res.json("error")
        }
    });
    
})


module.exports=router;