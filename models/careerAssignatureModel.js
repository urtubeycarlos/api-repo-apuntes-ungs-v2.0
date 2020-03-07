const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class CareerAssignature extends Model {}
CareerAssignature.init({
    CareerId: Sequelize.INTEGER,
    AssignatureId: Sequelize.INTEGER
}, { sequelize, modelName: 'careerassignature' })

module.exports = CareerAssignature;