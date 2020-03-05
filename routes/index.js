var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let json = JSON.parse('{ "name":"John", "age":30, "city":"New York"}')
  res.send(json);
});

module.exports = router;
