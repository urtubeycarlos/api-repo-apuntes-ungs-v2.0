const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', function(req, res){

    const transporter = nodemailer.createTransport({
        service: 'gmail', //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
        auth: {
          user: 'repo.apuntes.ungs@gmail.com',
          pass: 'baobab#0510'
        }
    });

    const mailOptions = {
        from: req.fields.from,
        to: 'repo.apuntes.ungs@gmail.com',
        subject: req.fields.subject,
        text: req.fields.msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send(500, error)
        } else {
          res.send(info)
        }
    });

});

module.exports = router;