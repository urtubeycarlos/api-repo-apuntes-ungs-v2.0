const Note = require('./../models/noteModel')

const getAllNotes = () => {
    return Note.findAll()
}

const getNotesByAssignatureId = (assignatureId) => {
    return Note.findAll({
        where:{
            assignatureId: assignatureId
        }
    })
}

const addNote = (filename, extension, description, assignatureId, url) => {
    return Note.create({
        filename: filename,
        extension: extension,
        description: description,
        assignatureId: assignatureId,
        url: url
    })
}

module.exports = {
    getAllNotes: getAllNotes,
    getNotesByAssignatureId: getNotesByAssignatureId,
    addNote: addNote
}