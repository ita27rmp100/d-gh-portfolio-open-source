var express = require('express');
var router = express.Router();
require("dotenv").config(); // load it again

const api = process.env.GITHUB_TOKEN;
console.log("Loaded token:", api);

/* GET home page. */
router.get('/:username?', function(req, res, next) {
  res.render('index', {
    username: req.params.username || 'ita27rmp100',
    token: api
  });
});

module.exports = router;
