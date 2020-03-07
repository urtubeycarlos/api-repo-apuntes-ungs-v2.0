module.exports = (sequelize,type) => {
    const Career = sequelize.define('Career',{
        Name: {
            type: type.STRING
        },
        Md5Name: {
            type: type.STRING
        }
    })
    return Career
}