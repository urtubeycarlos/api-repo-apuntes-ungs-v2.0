const md5 = require('md5');
const { Career } = require('./../vendor/sequelize')

const getAllCareers = () => {
    return Career.findAll();
}

const getCareerById = Id => {
    return Career.findAll({
        where:{
            id: Id
        }
    })
}

const addCareer = name => {
    return Career.create({
        Name: name,
        Md5Name: md5(name)
    })
}

const addAssignatureToCareer = (careerId, assignatureId) => {
    getCareerById(careerId).then( result => {
        
    })
    return firebase.database().ref(`careers/${careerId}`).update()
}


module.exports = {
    getAllCareers: getAllCareers,
    getCareerById: getCareerById,
    addCareer: addCareer
} 