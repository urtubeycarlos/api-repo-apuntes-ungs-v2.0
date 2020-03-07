const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Career extends Model {}
Career.init({
    Name: {
        type: type.STRING
    },
    Md5Name: {
        type: type.STRING
    }
}, { sequelize, modelName: 'career' });