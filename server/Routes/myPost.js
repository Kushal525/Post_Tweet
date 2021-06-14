const router=require('express').Router();
const { connection } = require('../db/connection')
const {validateToken} = require('../middleware/Auth');
const ts = Date.now();

router.get('/',validateToken, (req, res) => {
    user_id=res.user_id;
    connection.query("SELECT b.post_id, b.text_post, a.user_name,b.post_time FROM user_table a, post_table b where b.user_id=a.user_id and b.user_id=? order by post_id desc",[user_id], async (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }        
    })
});

router.post('/insertpost',validateToken, async (req, res) => {
    const user_id = res.user_id;
    const sqlInsertPost = await "INSERT INTO post_table(user_id,text_post,post_time) values(?,?,?)";
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let minutes = date_ob.getMinutes()
    let miliseconds = date_ob.getSeconds()
    const text_post = req.body.text_post;
    const post_time = year + "-" + month + "-" + date +" "+ hour + ":"+ minutes +":"+ miliseconds;

    if(!text_post){
        return console.log("Post Required");
    }
    connection.query(sqlInsertPost,[user_id,text_post,post_time], async (error, result)=> {
        if (error) {
            res.json(error);
        }else{
        }
        res.json(result);
    })
});


module.exports=router;