const firebase = require('firebase-admin');
const firebaseCredential = require('./../credentials/firebase.json');

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredential),
  databaseURL: "https://repo-apuntes-ungs.firebaseio.com"
})

module.exports = firebase;