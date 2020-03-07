var express = require('express');
var router = express.Router();
const noteService = require('./../services/noteService')

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('Notes!');
});

router.get('/:id', function(req, res){

})

router.post('/', function(req, res){

});

module.exports = router;
