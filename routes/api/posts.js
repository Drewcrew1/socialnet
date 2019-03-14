const express = require('express');
const router = express.Router();

//@route get api/posts/test
//@access Public
router.get('/test',(req,res) => {
    res.json({msg: "posts Works"});
});

module.exports = router;