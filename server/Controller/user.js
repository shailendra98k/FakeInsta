
const express = require('express')
const router = express.Router();
const Post = require('../Model/post');
const User = require('../Model/user')



router.post('/signIn', function (req, res) {
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

router.post('/signUp', function (req, res) {

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

router.get('/:id',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
        res.send(user)
    }).catch((err)=>{
        console.log("Error in fetchig users,", err)
    })

})

router.patch('/:id',(req,res)=>{
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
router.get("/:userId/posts",(req,res)=>{
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

module.exports = router