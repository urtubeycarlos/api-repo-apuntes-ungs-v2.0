const firebase  = require('./../vendor/firebase');
const careerRef = firebase.database().ref('careers');
const Career = require('./../models/career')
const md5 = require('md5');

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
    return getAllCareers().then( results => {
        var exists = false;
        results.Careers.forEach( career => {
            exists = exists || (career.Name == name)
        })
        
        if( !exists ){
            let newCareer = {
                Name: name,
                Md5Name: md5(name),
                AssignaturesIDs: [0]
            }

            careerRef.push(newCareer);

            return {
                status: 201,
                description: "Career added successfully"
            }
        } else {
            return {
                status: 200,
                description: "Career already exists"
            }
        }

    })

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