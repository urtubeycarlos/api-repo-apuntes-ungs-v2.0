module.exports = (sequelize,type) => {
    const Assignature = sequelize.define('assignature', {
        Id: {
            type: type.INTEGER
        },
        Name:{
            type: type.STRING
        },
        Md5Name:{
            type: type.STRING
        }
    })
    return Assignature
}