const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
/* const firebase  = require('./vendor/firebase') */;



/* const db = firebase.database();
const ref = db.ref('careers');
ref.push({
  name:"Tecnicatura Superior en Informatica"
});
 */
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

app.use('/', indexRouter);
app.use('/assignature', assignatureRouter);
app.use('/career', careerRouter);
app.use('/note', noteRouter);

app.listen(3000, function () {
  console.log(`Server working on http://localhost:3000/`);
})
