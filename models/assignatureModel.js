const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Assignature extends Model{}
Assignature.init({
    name:{
        type: Sequelize.STRING
    },
    md5Name:{
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'assignature'});

module.exports = Assignature;