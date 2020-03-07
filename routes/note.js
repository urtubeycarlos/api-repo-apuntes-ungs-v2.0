var express = require('express');
var router = express.Router();
const noteService = require('./../services/noteService')

/* GET users listing. */
router.get('/', function(req, res) {
    noteService.getAllNotes().then( results => res.status(200).send(results) )
});

router.get('/:id', function(req, res){
    noteService.getNotesByAssignatureId(req.params.id).then( results => res.status(200).send(results) )
})

router.post('/', function(req, res){
    console.log(req.fields.name);
    console.log(req.files);
    res.send('Ok')
});

module.exports = router;
