const md5 = require('md5');
const Career = require('./../models/careerModel')

const getAllCareers = () => {
    return Career.findAll();
}

const getCareerById = Id => {
    return Career.findAll({
        where:{
            id: Id
        }
    });
}

const addCareer = name => {
    return Career.create({
        Name: name,
        Md5Name: md5(name)
    })

}

module.exports = {
    getAllCareers: getAllCareers,
    getCareerById: getCareerById,
    addCareer: addCareer
} 