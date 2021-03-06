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
//@route post api/posts/like:id
//@access Private
router.post('/like/:id',passport.authenticate('jwt',{session: false}), (req,res) => {
    Profile.findOne({user: req.user.id}).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked: 'User already liked this post'});
            }

            post.likes.unshift({user: req.user.id});
            post.save().then((post) => {
                res.json(post);
            });
        }).catch((err) => {
                res.status(404).json({postnotfound: 'no post found'});
            });

        });
    });

//@route post api/posts/unlike:id
//@access Private
router.post('/unlike/:id',passport.authenticate('jwt',{session: false}), (req,res) => {
    Profile.findOne({user: req.user.id}).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({notliked: 'you have not liked this post'});
            }

            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex,1);
            post.save().then((post) => {
                res.json(post);
            });
        }).catch((err) => {
            res.status(404).json({postnotfound: 'no post found'});
        });

    });
});
//@route post api/posts/comment/:id
//@access Private
router.post('/comment/:id',passport.authenticate('jwt', {session: false}), (req,res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then((post) => {
       const newComment = {
           text: req.body.text,
           name: req.body.name,
           avatar: req.body.avatar,
           user: req.user.id
       };

       post.comments.unshift(newComment);
       post.save().then((post) => {
           res.json(post);
       }).catch((err) => {
           res.status(404).json({postnotfound: 'no post found'});
       });
   })
});
//merge master 5
//@route delete api/posts/comment/:id/:comment_id
//@access Private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt', {session: false}), (req,res) => {

    Post.findById(req.params.id).then((post) => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
            return res.status(404).json({commenterr: 'comment does not exsist'});
        }
        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => {
            res.json(post);

        });

    })
});

module.exports = router;