const express = require('express')
const app = express()
const port = 8000
const mongoose = require('./config/mongoose');
const User = require('./Model/user');
const Post = require('./Model/post');
var cors = require('cors');
const Comment = require('./Model/comment');
const fileUpload=require('express-fileupload')

const bodyParser = require('body-parser');
const post = require('./Model/post');
app.use(bodyParser());
app.use(cors());
app.get('/', function (req, res) {
    return res.send("Hi");
});

app.get("/user/:userId/posts",(req,res)=>{
    //Returns all the post created by the user themselves.
    Post.find({'user':req.params.userId}).populate({ path: 'user', select: 'username firstName'})
        .exec((err, posts) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.send(posts)
        })
})



app.post('/post/add', function (req, res) {

    Post.create(req.body)
        .then((post) => {
            console.log("Post Created Successfully", post);
            return res.send(post)
        }).catch((err) => {
            console.log("Post Created Successfully!!!");
            return res.json(err);
        })

});

app.post('/comment/add', function (req, res) {
    console.log(req.body)
    Comment.create(req.body)
        .then((comment) => {
            console.log("Req body", req.body.post);
            Post.findOne({ _id: req.body.post })
                .then((post) => {
                    console.log("Before Pussin ,")
                    console.log(post)
                    post.comments.push(comment);
                    post.save()

                    return res.send(comment)
                })
                .catch((err) => {
                    console.log("error in adding comment to post", err);
                })

        }).catch((err) => {
            console.log("Error in adding Comment");
            return res.json(err);
        })

})


app.post('/user/signIn', function (req, res) {
    console.log(req.body);
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            console.log("Error in Signing In...", err);
            res.redirect('back');
        }
        if (user) {
            console.log(user);
            res.cookie(user._id, user.username, { httpOnly: true });
            res.json(
                {
                    data: user,
                    statusCode: 200
                }
            );
        }
        else {
            console.log("Invalid Username or Password");
            res.json(
                {
                    statusCode: 401
                });
        }
    })
});

app.post('/user/signUp', function (req, res) {

    console.log(req.body);

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            console.log("Error in Signing Up...", err);
            res.redirect('back');
        }
        if (user) {
            console.log("User already Exist...");
            return res.json({
                statusCode: 401
            })
        }
        else {
            User.create(req.body);
            return res.json({
                statusCode: 200
            })

        }
    })
});

app.use(fileUpload() );
app.post('/post/image/add',(req,res)=>{

    
    const image=req.files.image;
    // const imagename=req.files.image.name;

    const imagename=Date.now();
   
    image.mv(`../client/src/upload/${imagename}.jpg` , (err)=>{
        if(err)
        { 
            console.log("error in moving image iin server",err);
            res.status(500).send(err);
        }
      


        res.json({
            filename:imagename,
            filepath:`../client/public/upload/${imagename}.jpg`


        })
    })

})


app.get('/delete/comment/:id', function (req, res) {

    console.log("deleying comment")
    console.log(req.params.id);
    Comment.findByIdAndDelete(req.params.id)
        .then((comment) => {
            console.log("Deleted", comment)
            const id = comment._id;
            var post;
            Post.findById(comment.post)
                .then((post) => {
                    post = post;
                    console.log("Post of comment", post)

                    for (let i = 0; i < post.comments.length; i++) {
                        console.log("ID......................", typeof (JSON.stringify(id)), typeof (JSON.stringify(post.comments[i]._id)))
                        if (JSON.stringify(post.comments[i]._id) == JSON.stringify(id)) {

                            var temp = post.comments.slice(i + 1);
                            post.comments = post.comments.slice(0, i);
                            post.comments.concat(temp);
                            post.save();

                            break;
                        }
                    }

                    res.send("OK");

                });
        })
        .catch(err => { console.log(err) });
})

app.get('/delete/post/:id', function (req, res) {
    console.log(req.params.id);
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            console.log("Deleted", post);
            const comments = post.comments;
            comments.map((comment) => {
                
                let id = comment._id;
                Comment.findByIdAndDelete(id).then(comment => { }).catch(err => { console.log(err) });
            })
            
            res.send("Deleted");
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

})

app.get('/user/get', (req, res) => {

    User.find().then((users) => {
        res.send(users);
    }).catch(err => { console.log("Error in fetchig users,", err) })

})




app.get('/user/:id',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
        res.send(user)
    }).catch((err)=>{
        console.log("Error in fetchig users,", err)
    })

})

app.patch('/user/:id',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
        for(key in req.body){
            user[key]=req.body[key];
        }
        user.save();
        res.send("Updated")
    }).catch((err)=>{
        console.log("Error in fetchig users,", err)
    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



