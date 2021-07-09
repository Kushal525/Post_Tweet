const router=require('express').Router();
const { connection } = require('../db/connection')

router.post('/', (req, res)=>{
    const firstname = req.body.firstname;
    const sqlFindUser = "select * from user_table where first_name=?";
    connection.query(sqlFindUser,[firstname], (error, result) => {
        if(result.length>0){
            res.json(result)
        }else{
            res.json("error")
        }
    });
})


module.exports=router;