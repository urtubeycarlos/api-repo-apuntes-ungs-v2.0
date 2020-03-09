const express = require('express');
const router = express.Router();
const { apiVersion, apiCodename } = require('./../config')

router.get('/', function(req, res) {
  
  let careerDoc = {
      GET: {
          'api/:version/career': {
              description: "Carreras universitarias.",
              example: `/${apiVersion}/career`
            },
          'api/:version/career/:id': {
            description: "Carrera universitaria que posee el id recibido.",
            example: `/${apiVersion}/career/1`
          }
      }
  }

  let assignatureDoc = {
      GET: {
          'api/:version/assignature': {
              description: "Espacios curriculares, cada uno asociado a una o mas carreras universitarias.",
              example: `/${apiVersion}/assignature`
          },
          'api/:version/assignature/:careerid': {
              description: "Espacios curricularres asociados a la carrera universitaria con el id recibido.",
              example: `/${apiVersion}/assignature/1`
          }
      }
  };

  let noteDoc = {
      GET: {
          'api/:version/note': {
              description: "Documentos subidos por los usuarios, asociados a una materia.",
              example: `/${apiVersion}/note`
          },
          'api/:version/note/:id': {
              description: "Documento con subido por un usuario que tenga la materia con el id recibido.",
              example: `/${apiVersion}/note/1`
          }
      }
  };
  
  let doc = {
      career: careerDoc,
      assignature: assignatureDoc,
      note: noteDoc,
      version: {
          number: `${apiVersion}`,
          codename: `${apiCodename}`
      }
  }

  res.status(200).json(doc);
});

module.exports = router;
