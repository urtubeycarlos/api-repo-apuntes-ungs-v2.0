var express = require('express');
var router = express.Router();
const md5 = require('md5');
const firebase  = require('./../vendor/firebase');
const careerRef = firebase.database().ref('career');

router.get('/', function(req, res) {
    
    const results = {
      Careers: []
    };

    careerRef.once('value', snapshot => {
      
      data = snapshot.val();
      Object.keys(data).forEach( key => {
          let temp = {
            Id: key
          }
          temp = Object.assign(temp, data[key]);
          results.Careers.push(temp);
      })

      res.status(200).json( results );
    })
    
});

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
            AssignatureIDs: []
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
