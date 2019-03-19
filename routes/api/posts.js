const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');
//@route get api/posts/test
//@access Public
router.get('/test',(req,res) => {
    res.json({msg: "posts Works"});
});

//@route get api/posts
//@access Public
router.get('/',(req,res) => {
   Post.find().sort({date: -1}).then((posts) => {
       res.json(posts);
   }).catch((err) => {
      res.status(404).json({nopost: 'no posts found'});;
   });
});
//@route get api/posts/:id
//@access Public
router.get('/:id',(req,res) => {
    Post.findById(req.params.id).then((post) => {
        res.json(post);
    }).catch((err) => {
        res.status(404).json({nopost: 'no post found'});
    });
});

//@route post api/posts
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

   const newPost =  new Post({
       text: req.body.text,
       name: req.body.name,
       avatar: req.body.avatar,
       user: req.user.id
   });
   newPost.save().then((post) => {
       res.json(post);
   });
});
//@route delete api/posts/:id
//@access Private
router.delete('/:id',passport.authenticate('jwt',{session: false}), (req,res) => {
   Profile.findOne({user: req.user.id}).then((profile) => {
       Post.findById(req.params.id).then((post) => {
           if(post.user.toString() !== req.user.id){
                return res.status(401).json({noauth: 'you are not autherized'});
           }
           post.remove().then(() => {
               res.json({success: true});
           }).catch((err) => {
               res.status(404).json({postnotfound: 'no post found'});
           });

       });
   });
});


module.exports = router;