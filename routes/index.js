var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:username?', function(req, res, next) {
  res.render('index', { username:req.params.username || 'ita27rmp100' });
});

module.exports = router;
