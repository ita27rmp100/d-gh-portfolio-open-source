var express = require('express');
var router = express.Router();

router.get('/:username',(req,res)=>{
    res.render("messages",{username:req.params.username})
})

module.exports = router