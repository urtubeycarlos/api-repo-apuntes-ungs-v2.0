const Sequelize = require('sequelize');
const { dbHost, dbDialect, dbUser, dbPassword, dbName, dbPort } = require('./../credentials/db')

/* const AssignatureModel = require('./../models/assignatureModel');
const CareerModel = require('./../models/careerModel');
const NoteModel = require('./../models/noteModel') */

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort
})


/* var Assignature = AssignatureModel(sequelize, Sequelize);
var Career = CareerModel(sequelize, Sequelize);
var Note = NoteModel(sequelize, Sequelize); */

sequelize.sync();

module.exports = sequelize;

/* module.exports = {
    Assignature,
    Career,
    Note
} */