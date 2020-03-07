const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Career extends Model {}
Career.init({
    Name: {
        type: Sequelize.STRING
    },
    Md5Name: {
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'career' });

module.exports = Career;

