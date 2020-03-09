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
    
    driveService.assertAccess( oAuth => {
        Object.keys(req.files).forEach( filename => {
            driveService.simpleUpload(oAuth, null, req.files[filename], (err, result) => {
                driveService.getById(oAuth, result.id, (err, data) => {
                    const extension = req.files[filename].type.split('/')[1];
                    noteService.addNote(filename, extension, req.fields.description, req.fields.assignatureid, data.webContentLink)
                            .then( querryResult => res.status(201).send(querryResult) )
                            .catch( err => res.status(501).send(err) );
                })
            })
        });
    })
});

module.exports = router;
