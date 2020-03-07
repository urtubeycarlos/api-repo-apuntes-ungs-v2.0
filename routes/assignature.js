var express = require('express');
var router = express.Router();
const assignatureService = require('./../services/assignatureService');

/* GET users listing. */
router.get('/', function(req, res) {
    assignatureService.getAllAssignatures().then( result => {
        res.send(result)
    } );
});

router.get('/:careerid', function(req, res){
    assignatureService.getAllAssignaturesByCareerId(req.params.careerid)
        .then( result => {
            res.send(result);
        });
});

router.post('/', function(req, res){
    assignatureService.addAssignature(req.fields.name)
        .then( result => {
            assignatureService.linkCareer(result.id, req.fields.careerid);
            res.send(result);
        });
})

module.exports = router;
