const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = (sequelize, type) => {
    const Note = sequelize.define('note', {
        Filename: {
            type: type.STRING
        },
        Extension: {
            type: type.STRING
        },
        Description: {
            type: type.STRING
        },
        Url: {
            type: type.STRING
        }
    })

    return Note
}