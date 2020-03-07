const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Assignature extends Model{}
Assignature.init({
    Name:{
        type: Sequelize.STRING
    },
    Md5Name:{
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'assignature'});

module.exports = Assignature;