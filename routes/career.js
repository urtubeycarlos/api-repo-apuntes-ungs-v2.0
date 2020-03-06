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
    careerRef.orderByChild('name').equalTo(req.body.name).once('value', snapshot => {
        if( snapshot.val() ){
          
          const ret = {
            status: 200,
            description: 'Career is already in database'
          }

          res.status(200).json(ret);
        } else {
          
          const newCareer = {
            Name: req.body.name,
            Md5Name: md5(req.body.name),
            AssignatureIDs: [0]
          }

          careerRef.push(newCareer);
          
          const ret = {
            status: 201,
            description: 'Career added succesfully'
          }

          res.status(201).json(ret);
        }
    });
})


module.exports = router;
