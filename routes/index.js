var express = require('express');
const { token } = require('morgan');
var router = express.Router();
require("dotenv").config()
const api = process.env.GITHUB_TOKEN
/* GET home page. */
router.get('/:username?', function(req, res, next) {
  res.render(
    'index',
    {
      username:req.params.username || 'ita27rmp100',
      token:api
    });
});

module.exports = router;
