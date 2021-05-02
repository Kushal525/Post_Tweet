const express = require('express');
const cors = require('cors');
const { connection } = require('./db/connection')
const app = express();
const ts = Date.now();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

app.post('/login', async (req, res) => {
    const sqlogin = await "SELECT * FROM user_table WHERE user_name=? AND password=?";
    const user_name = req.body.username;
    const password = req.body.password;
    connection.query(sqlogin,[user_name, password], (error, result) => {
        if(error){
            res.json(error)
        }else{
            res.json(result);
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
    sqlComment ="select c.post_comment, a.user_name,c.comment_time from user_table a, post_table b, comment_table c where c.post_id=b.post_id and b.post_id=? and a.user_id=c.user_id;";
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
        }
        res.json(result);
    })
});

app.post('/post/:post_id/')

app.listen(3001, () => {
    console.log("Server running on port 3001")
})