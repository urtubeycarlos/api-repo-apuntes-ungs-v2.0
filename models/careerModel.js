const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Career extends Model {}
Career.init({
    name: {
        type: Sequelize.STRING
    },
    md5Name: {
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'career' });

module.exports = Career;

