const express = require('express');
const router = express.Router();
const noteService = require('./../services/noteService');
const driveService = require('./../vendor/GDrive');

/* GET users listing. */
router.get('/', function(req, res) {
    noteService.getAllNotes().then( results => res.status(200).send(results) )
});

router.get('/:id', function(req, res){
    noteService.getNotesByAssignatureId(req.params.id).then( results => res.status(200).send(results) )
})

router.post('/', function(req, res){
    
    driveService.assertAccess( oAuthClient => { 
        Object.keys(req.files).forEach( filename => {
            driveService.resumableUpload(oAuthClient, null, req.files[filename], result => {
                console.log(result);
            })
        });
    })

    res.send('Ok')
});

module.exports = router;
