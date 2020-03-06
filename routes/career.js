var express = require('express');
var router = express.Router();
const md5 = require('md5');
const careerService = require('./../services/careerService')

router.get('/', function(req, res) {
    careerService.getAllCareers().then( results => res.send(results) );
});

router.get('/:id', function(req, res){
    careerService.getCareerById(req.params.id).then( result => res.send(result) );
})

router.post('/', function(req, res){
    careerService.addCareer(req.body.name).then( result => res.send(result) );
})

router.patch('/', function(req, res){

})


module.exports = router;
