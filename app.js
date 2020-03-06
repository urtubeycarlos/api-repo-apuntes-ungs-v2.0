const config = require('./config')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

var app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const indexRouter = require('./routes/index');
const assignatureRouter = require('./routes/assignature');
const careerRouter = require('./routes/career');
const noteRouter = require('./routes/note')

app.use(`/api/${config.apiCodename}/${config.apiVersion}/`, indexRouter);
app.use(`/api/${config.apiCodename}/${config.apiVersion}/assignature`, assignatureRouter);
app.use(`/api/${config.apiCodename}/${config.apiVersion}/career`, careerRouter);
app.use(`/api/${config.apiCodename}/${config.apiVersion}/note`, noteRouter);

app.get('/api', function(req, res){
    res.redirect(`/api/${config.apiCodename}/${config.apiVersion}`)
})

app.listen(config.port, function () {
  console.log(`Server working on http://localhost:${config.port}/api/`);
})
