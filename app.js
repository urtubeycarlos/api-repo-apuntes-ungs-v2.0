const { apiVersion, apiCodename, port } = require('./config')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');

var app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(formidableMiddleware())

const indexRouter = require('./routes/index');
const assignatureRouter = require('./routes/assignature');
const careerRouter = require('./routes/career');
const noteRouter = require('./routes/note')
const loginRouter = require('./routes/login')
const contactRouter = require('./routes/contact')

app.use(`/api/${apiVersion}/`, indexRouter);
app.use(`/api/${apiVersion}/assignature`, assignatureRouter);
app.use(`/api/${apiVersion}/career`, careerRouter);
app.use(`/api/${apiVersion}/note`, noteRouter);

app.get('/api', function(req, res){
    res.redirect(`/api/${apiVersion}`)
})

app.use('/login', loginRouter);
app.use('/contact', contactRouter);

app.listen(port, function () {
  console.log(`Server working on http://localhost:${port}/api/`);
})
