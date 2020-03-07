const Sequelize = require('sequelize');
const { dbHost, dbDialect, dbUser, dbPassword, dbName } = require('./../credentials/db')

const AssignatureModel = require('./../models/assignature');
const CareerModel = require('./../models/careerModel');
const NoteModel = require('./../models/noteModel')

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect
})

var Assignature = new AssignatureModel(sequelize, Sequelize);
var Career = new CareerModel(sequelize, Sequelize);
var Note = new NoteModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
    sequelize,
    Assignature,
    Career,
    Note
}