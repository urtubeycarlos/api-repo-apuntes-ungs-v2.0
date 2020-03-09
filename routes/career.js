var express = require('express');
var router = express.Router();
const md5 = require('md5');
const careerService = require('./../services/careerService')

router.get('/', function(req, res) {
    careerService.getAllCareers()
        .then( result => res.status(200).json(result) )
        .catch( err => res.status(500).send(err) );
});

router.get('/:id', function(req, res){
    careerService.getCareerById(req.params.id)
        .then( result => res.status(200).send(result) )
        .catch( err => res.status(500).send(err) );
})

router.post('/', function(req, res){
    careerService.getCareerByName( req.fields.name )
        .then( result => {
            if( result.length > 0 )
                res.status(200).json(result)
            else {
                careerService.addCareer(req.fields.name)
                    .then( result => res.status(201).json(result) )
                    .catch( err => res.status(500).send(err) );
            }
        })
        .catch( err => res.status(500).send(err) );
    
})

module.exports = router;
