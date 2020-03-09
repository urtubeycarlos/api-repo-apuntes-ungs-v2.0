const Sequelize = require('sequelize');
const sequelize = require('./../vendor/sequelize');
const Model = Sequelize.Model;

class Note extends Model{}
Note.init({
    filename: {
        type: Sequelize.STRING
    },
    extension: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    assignatureId: {
        type: Sequelize.INTEGER
    },
    url: {
        type: Sequelize.STRING
    }
}, { sequelize,modelName: 'note' });

module.exports = Note;