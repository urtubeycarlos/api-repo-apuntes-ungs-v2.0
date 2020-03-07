const md5 = require('md5');
const Assignature = require('./../models/assignatureModel')
const CareerAssignature = require('./../models/careerAssignatureModel');
const careerService = require('./careerService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

const getAllAssignaturesByCareerId = careerId => {
    return CareerAssignature.findAll({
            where: {
                CareerId: careerId
            }
        }
    ).then( results => {
        return results.map( result => {
            return {
                id: result.AssignatureId
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
        Name: name,
        Md5Name: md5(name)
    });
}

const linkCareer = (assignatureId, careerId) => {
    CareerAssignature.create({
        CareerId: careerId,
        AssignatureId: assignatureId
    })
}

module.exports = {
    getAllAssignatures:getAllAssignatures,
    getAssignatureById:getAssignatureById,
    getAllAssignaturesByCareerId:getAllAssignaturesByCareerId,
    linkCareer:linkCareer,
    addAssignature:addAssignature
}