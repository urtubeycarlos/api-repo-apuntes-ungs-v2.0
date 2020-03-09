const md5 = require('md5');
const Career = require('./../models/careerModel')

const getAllCareers = () => {
    return Career.findAll();
}

const getCareerById = id => {
    return Career.findAll({
        where:{
            id: id
        }
    });
}

const getCareerByName = name => {
    return Career.findAll({
        where: {
            name: name
        }
    })
}

const addCareer = name => {
    return Career.create({
        name: name,
        md5Name: md5(name)
    })

}

module.exports = {
    getAllCareers: getAllCareers,
    getCareerById: getCareerById,
    getCareerByName: getCareerByName,
    addCareer: addCareer
} 