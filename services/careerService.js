const firebase  = require('./../vendor/firebase');
const careerRef = firebase.database().ref('careers');
const Career = require('./../models/career')

const getAllCareers = () => {
    return careerRef.once('value').then( results => {
        ret = {
            Careers: []
        }
        data = results.val();
        Object.entries(data).forEach( result => {
            ret.Careers.push( parseSnapshot(result) )
        })
        return ret;
    })
}

const getCareerById = (id) => {
    return getAllCareers().then( results => {
        return results.Careers.filter( career => career.Id == id )
    });
}

const addCareer = name => {

}

const addAssignatureToCareer = careerId => {

}

const parseSnapshot = snapshot => {
    return new Career(snapshot);
}

module.exports = {
    getAllCareers: getAllCareers,
    getCareerById: getCareerById,
    parseSnapshot: parseSnapshot
} 