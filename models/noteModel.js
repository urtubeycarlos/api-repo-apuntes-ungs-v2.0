const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Note extends Model{}
Note.init({
    Filename: {
        type: Sequelize.STRING
    },
    Extension: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    Url: {
        type: Sequelize.STRING
    },
    AssignatureId:{
        type: Sequelize.INTEGER
    }
}, { sequelize,modelName: 'note' });

module.exports = Note;