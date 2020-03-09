const md5 = require('md5');
const Assignature = require('./../models/assignatureModel')
const CareerAssignature = require('./../models/careerAssignatureModel');
const careerService = require('./careerService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const driveService = require('./../vendor/GDrive');

const getAllAssignatures = () => {
    return Assignature.findAll();
}

const getAssignatureById = Id => {
    return Assignature.findAll({
        where:{
            id: Id
        }
    })
}

const getAssignatureByName = name => {
    return Assignature.findAll({
        where: {
            name: name
        }
    })
}

const getAllAssignaturesByCareerId = careerId => {
    return CareerAssignature.findAll({
            where: {
                careerId: careerId
            }
        }
    ).then( results => {
        return results.map( result => {
            return {
                id: result.assignatureId
            }   
        });
    }).then( assignaturesIds => {
        return Assignature.findAll({
            where: {
                [Op.or]: assignaturesIds
            }
        })
    })
}

const addAssignature = name => {
    return Assignature.create({
        name: name,
        md5Name: md5(name)
    });
}

const linkCareer = (assignatureId, careerId) => {
    CareerAssignature.create({
        careerId: careerId,
        assignatureId: assignatureId
    })
}

module.exports = {
    getAllAssignatures: getAllAssignatures,
    getAssignatureById: getAssignatureById,
    getAssignatureByName: getAssignatureByName,
    getAllAssignaturesByCareerId: getAllAssignaturesByCareerId,
    linkCareer: linkCareer,
    addAssignature: addAssignature
}