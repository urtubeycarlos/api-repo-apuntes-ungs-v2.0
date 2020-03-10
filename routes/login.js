const express = require('express');
const router = express.Router();

router.post('/', function(req, res){
    var isLogged = true;
    const lat = parseFloat(req.fields.lat);
    const lon = parseFloat(req.fields.lon);

    result = {
        isLogged: isLogged
    }
    res.status(200).json(result);

})


module.exports = router;