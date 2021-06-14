const router=require('express').Router();
const { connection } = require('../db/connection')
const {validateToken} = require('../middleware/Auth');

router.get('/', validateToken, (req, res) => {
    const user_id = res.user_id;
    const sqlFindUser = "select * from user_table where user_id=?";
    connection.query(sqlFindUser,[user_id], (error, result) => {
        if(result.length>0){
            res.json(result)
        }else{
            res.json("error")
        }
    });
})


module.exports=router;