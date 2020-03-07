const Career = require('../models/careerModel')
const md5 = require('md5');
const { Career } = require('./../vendor/sequelize')

const getAllCareers = () => {
    return Career.findAll();
}

const getCareerByName = name => {
    return Career.findAll({
        where:{
            Name: name
        }
    })
}

const addCareer = name => {

}

const addAssignatureToCareer = (careerId, assignatureId) => {
    getCareerById(careerId).then( result => {
        
    })
    return firebase.database().ref(`careers/${careerId}`).update()
}

const parseSnapshot = snapshot => {
    return new Career(snapshot);
}

module.exports = {
    getAllCareers: getAllCareers,
    getCareerById: getCareerById,
    addCareer: addCareer,
    parseSnapshot: parseSnapshot
} 