const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;
const Assignature = require('./assignatureModel');

class Career extends Model {}
Career.init({
    Name: {
        type: Sequelize.STRING
    },
    Md5Name: {
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'career' });

Career.hasMany(Assignature);

module.exports = Career;

