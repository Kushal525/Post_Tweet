const express = require('express');
const cors = require('cors');
const { connection } = require('./db/connection')
const app = express();
const ts = Date.now();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

app.post('/login', async (req, res) => {
    const user_name = req.body.username;
    const password = req.body.password;
    const sqlogin = await "SELECT * FROM user_table WHERE user_name=? AND password=?";
    const token = jwt.sign({_id: user_name.toString()}, "hello")
    connection.query(sqlogin,[user_name, password], (error, result) => {
        if(result.length>0){
            res.json(token);
        }else{
            res.json("error")
        }
    });
    
})

app.get('/mypost', (req, res) => {
    connection.query("SELECT b.post_id, b.text_post, a.user_name,b.post_time FROM user_table a, post_table b where b.user_id=a.user_id and b.user_id=4 order by post_id desc", async (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
        
    })
});

app.get('/otherpost', (req, res) => {
    sqlOtherPost ="SELECT b.post_id,b.text_post, a.user_name,b.post_time FROM user_table a, post_table b where b.user_id=a.user_id and b.user_id<>4 order by post_id desc";
    connection.query(sqlOtherPost, (error, result)=> {
        if (error) {
            res.json(error);
        }else{
            res.json(result);
        }
    })
});

app.post('/insertpost', async (req, res) => {
    const sqlInsertPost = await "INSERT INTO post_table(user_id,text_post,post_time) values(?,?,?)";
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let minutes = date_ob.getMinutes()
    let miliseconds = date_ob.getSeconds()
    const user_id=4;
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

app.get('/post/:post_id', async (req, res) => {
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

app.get('/comment/:post_id', (req, res) => {
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


app.post('/insertcomment/:post_id', async (req, res) => {
    const sqlInsertComment = await "INSERT INTO comment_table(post_id,user_id,post_comment,comment_time) values(?,?,?,?)";
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let miliseconds = date_ob.getSeconds();

    const post_id = req.params.post_id;
    const user_id=4;
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

app.get('/likes/:post_id/', async (req, res) => {
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

app.get('/dislikes/:post_id/', async (req, res) => {
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

app.post('/likes/:post_id/', async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = 2;
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

app.post('/dislikes/:post_id/', async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = 2;
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

app.listen(3001, () => {
    console.log("Server running on port 3001")
})