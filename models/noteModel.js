module.exports = (sequelize, type) => {
    const Note = sequelize.define('note', {
        Id: {
            type: type.INTEGER
        },
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