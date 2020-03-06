var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //TODO: Documentación
  let json = JSON.parse('{ "name":"John", "age":30, "city":"New York"}')
  res.send(json);
});

module.exports = router;
