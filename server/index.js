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

app.use('/user',require('./Controller/user'));

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


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



