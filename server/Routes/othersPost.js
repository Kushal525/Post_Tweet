const router=require('express').Router();
const { connection } = require('../db/connection')
const {validateToken} = require('../middleware/Auth');

router.get('/',validateToken, (req, res) => {
    const user_id=res.user_id;
    sqlOtherPost ="SELECT b.post_id,b.text_post, a.user_name,b.post_time FROM user_table a, post_table b where b.user_id=a.user_id and b.user_id<>? order by post_id desc";
    connection.query(sqlOtherPost,[user_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
});


module.exports=router;