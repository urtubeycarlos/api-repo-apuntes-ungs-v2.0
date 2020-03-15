const express = require('express');
const router = express.Router();
const assignatureService = require('./../services/assignatureService');
const { getCareerByName } = require('./../services/careerService')

/* GET users listing. */
router.get('/', function(req, res) {
    assignatureService.getAllAssignatures()
        .then( result => res.status(200).json(result) )
        .catch( err => res.status(500).send(err) )
    
});

router.get('/:careerid', function(req, res){
    assignatureService.getAllAssignaturesByCareerId(req.params.careerid)
        .then( result => res.status(200).json(result) )
        .catch( err => res.status(500).send(err) );
});

router.post('/', function(req, res){
    assignatureService.getAssignatureByName(req.fields.name)
        .then( result => {
            if( result.length > 0 ){
                assignatureService.linkCareer(result[0].id, req.fields.careerid);
                res.status(200).json(result);
            } else {
                assignatureService.addAssignature(req.fields.name)
                .then( result => {
                    assignatureService.linkCareer(result.id, req.fields.careerid);
                    res.status(201).send(result);
                })
                .catch( err => res.status(500).send(err) );
            }
        })
        .catch( err => res.status(500).send(err) );
})

module.exports = router;
