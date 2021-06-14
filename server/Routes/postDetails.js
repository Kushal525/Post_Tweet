const router=require('express').Router();
const { connection } = require('../db/connection')
const jwt = require('jsonwebtoken');

router.get('/:post_id', async (req, res) => {
    const post_id = req.params.post_id;
    const sqlSelectPost = "SELECT b.post_id, b.text_post, a.user_name,b.post_time FROM user_table a, post_table b where b.post_id=? and b.user_id=a.user_id";
    connection.query(sqlSelectPost, [post_id], (error, result)=>{
        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
 });


//Show Post Likes
router.get('/likes/:post_id/', async (req, res) => {
    const post_id = req.params.post_id;
    const sqlLike = await "SELECT COUNT(post_like) as likes FROM user_behaviour_table where post_id=? and post_like=1";
    connection.query(sqlLike,[post_id], (error, result)=> {
        if (error) {
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

//Show Post DisLikes
router.get('/dislikes/:post_id/', async (req, res) => {
    const post_id = req.params.post_id;
    const sqlDisLike = await "SELECT user_behaviour_id, COUNT(post_dislike) as dislikes FROM user_behaviour_table where post_id=? and post_dislike=1";
    connection.query(sqlDisLike,[post_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
})

//Add Like to Post
router.post('/likes/:post_id/', async (req, res) => {
    const accessToken = req.body.accessToken;
    const validToken = jwt.verify(accessToken,"seosaphAssignmentAuthentication")
    const user_id = parseInt(validToken._id);
    const post_id = req.params.post_id;
    const post_dislike = 0;
    const post_like = 1;
    const sqlLikeDelete = await "delete from user_behaviour_table where post_id=? and user_id=?;"
    connection.query(sqlLikeDelete,[post_id, user_id], (error, result)=> {
        if (error) {
            console.log("error")
        }else{
            console.log("success")
        }
    })
    const sqlDisLike = await "INSERT INTO user_behaviour_table(post_id,user_id,post_like,post_dislike) values(?,?,?,?)";
    
    connection.query(sqlDisLike,[post_id,user_id,post_like,post_dislike], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
})

//Add Dislike to Post
router.post('/dislikes/:post_id/', async (req, res) => {
    const accessToken = req.body.accessToken;
    const validToken = jwt.verify(accessToken,"seosaphAssignmentAuthentication")
    const user_id = parseInt(validToken._id);
    const post_id = req.params.post_id;
    const post_dislike = 1;
    const post_like = 0;
    const sqlDisLikeDelete = await "delete from user_behaviour_table where post_id=? and user_id=?;"
    connection.query(sqlDisLikeDelete,[post_id, user_id], (error, result)=> {
        if (error) {
            console.log("error");
        }else{
            console.log("success");
        }
    })
    const sqlDisLike = await "INSERT INTO user_behaviour_table(post_id,user_id,post_like,post_dislike) values(?,?,?,?)";
    
    connection.query(sqlDisLike,[post_id,user_id,post_like,post_dislike], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
})


module.exports=router;