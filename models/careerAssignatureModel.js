const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class CareerAssignature extends Model {}
CareerAssignature.init({
    careerId: Sequelize.INTEGER,
    assignatureId: Sequelize.INTEGER
}, { sequelize, modelName: 'careerassignature' })

module.exports = CareerAssignature;