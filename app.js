var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var indexRouter = require('./routes/index');
var assignatureRouter = require('./routes/assignature');
var careerRouter = require('./routes/career');
var noteRouter = require('./routes/note')

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/assignature', assignatureRouter);
app.use('/career', careerRouter);
app.use('/note', noteRouter);

app.listen(3000, function () {
  console.log(`Working on http://localhost:3000/`);
})
