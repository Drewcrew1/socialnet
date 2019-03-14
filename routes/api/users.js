const express = require('express');
const router = express.Router();

//@route get api/users/test
//@access Public
router.get('/test',(req,res) => {
   res.json({msg: "Users Works"});
});

module.exports = router;