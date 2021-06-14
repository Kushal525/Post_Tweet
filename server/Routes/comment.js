const router=require('express').Router();
const { connection } = require('../db/connection')
const ts = Date.now();
const {validateToken} = require('../middleware/Auth');

//Show All Comments of Particular Post
router.get('/:post_id', (req, res) => {
    const post_id = req.params.post_id;
    sqlComment ="select c.post_comment, a.user_name,c.comment_time from user_table a, post_table b, comment_table c where c.post_id=b.post_id and b.post_id=? and a.user_id=c.user_id order by comment_id desc";
    connection.query(sqlComment,[post_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
});


//Add Post Comment to Post
router.post('/insertcomment/:post_id',validateToken, async (req, res) => {
    const sqlInsertComment = await "INSERT INTO comment_table(post_id,user_id,post_comment,comment_time) values(?,?,?,?)";
    const user_id = res.user_id;
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let miliseconds = date_ob.getSeconds();

    const post_id = req.params.post_id;
    const post_comment = req.body.post_comment;
    const comment_time = year + "-" + month + "-" + date +" "+ hour + ":"+ minutes +":"+ miliseconds;

    if(!post_comment){
        return console.log("Post Required");
    }
    connection.query(sqlInsertComment,[post_id,user_id,post_comment,comment_time], async (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
});


module.exports=router;