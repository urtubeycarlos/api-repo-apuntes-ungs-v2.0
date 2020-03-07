const md5 = require('md5');
const Assignature = require('./../models/assignatureModel')

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

const addAssignature = name => {
    return Assignature.create({
        Name: name,
        Md5Name: md5(name)
    })
}

const addNoteToAssignature = (assignatureId, noteId) => {
    getAssignatureById(assignatureId).then( result => {

    })
}