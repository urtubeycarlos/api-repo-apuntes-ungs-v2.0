const Note = require('./noteModel');
const Career = require('./careerModel');

module.exports = (sequelize,type) => {
    const Assignature = sequelize.define('assignature', {
        Name:{
            type: type.STRING
        },
        Md5Name:{
            type: type.STRING
        }
    })

    return Assignature
}