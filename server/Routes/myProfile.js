const router=require('express').Router();
const { connection } = require('../db/connection')
const {validateToken} = require('../middleware/Auth');


router.get('/',validateToken, (req, res) => {
    user_id=res.user_id;
    connection.query("SELECT * FROM user_table where user_id=?",[user_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }        
    })
});

//MyProfile TotalPosts
router.get('/posts',validateToken, (req, res) => {
    user_id=res.user_id;
    connection.query("SELECT COUNT(user_id) as totalpost FROM post_table WHERE user_id=?",[user_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }        
    })
});

//MyProfile TotalLikes
router.get('/likes',validateToken, (req, res) => {
    user_id=res.user_id;
    connection.query("SELECT COUNT(post_like) as totallikes FROM user_behaviour_table a, post_table b where a.post_id=b.post_id and a.post_like=1 and b.user_id=?",[user_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }        
    })
});

//MyProfile TotalDisLikes
router.get('/dislikes',validateToken, (req, res) => {
    user_id=res.user_id;
    connection.query("SELECT COUNT(post_dislike) as totaldislikes FROM user_behaviour_table a, post_table b where a.post_id=b.post_id and a.post_dislike=1 and b.user_id=?",[user_id], (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }        
    })
});


module.exports=router;