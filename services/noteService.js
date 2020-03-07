const Note = require('./../models/noteModel')

const getAllNotes = () => {
    return Note.findAll()
}

const getNotesByAssignatureId = (assignatureId) => {
    return Note.findAll({
        where:{
            AssignatureId: assignatureId
        }
    })
}


module.exports = {
    getAllNotes: getAllNotes,
    getNotesByAssignatureId: getNotesByAssignatureId
}