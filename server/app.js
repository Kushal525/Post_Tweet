const express = require('express');
const cors = require('cors');
require('./db/connection');
const app = express();
const loginRouter = require('./Routes/login');
const registerRouter = require('./Routes/register');
const myPostRouter = require('./Routes/myPost');
const othersPostRouter = require('./Routes/othersPost');
const myProfileRouter = require('./Routes/myProfile');
const postRouter = require('./Routes/postDetails');
const commentRouter = require('./Routes/comment');
const authRouter = require('./Routes/auth');
const searchRouter = require('./Routes/searchUser'); 

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3001;

//login
app.use('/login',loginRouter);

//Register
app.use('/register',registerRouter);

//mypost insertNewPost
app.use('/mypost',myPostRouter);

//others's Post
app.use('/otherpost', othersPostRouter);

//MyProfile total no.of posts, likes and dislikes
app.use('/myProfile', myProfileRouter);

//Tweet deatils likes dislikes
app.use('/post', postRouter);

//Comments add new comments
app.use('/comment', commentRouter);

//Authorized User
app.use('/auth', authRouter);

//Search user
app.use('/search', searchRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})