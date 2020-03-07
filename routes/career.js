var express = require('express');
var router = express.Router();
const md5 = require('md5');
const careerService = require('./../services/careerService')

router.get('/', function(req, res) {
    careerService.getAllCareers().then( result => {
        res.send(result);
    });
});

router.get('/:id', function(req, res){
    careerService.getCareerById(req.params.id).then( result => res.send(result) );
})

router.post('/', function(req, res){
    careerService.addCareer(req.body.name).then( result => res.send(result) );
})

module.exports = router;
