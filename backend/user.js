const firebase = require('./firebase')
const uuidv4 = require('uuid/v4');

function cretateUser(user){
    let uid = uuidv4();
    firebase.auth.createUser({
        uid: uid,
        email: 'user@example.com',
        displayName: 'minzli',
        password: 'pw123456'
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
        })
        .catch(function(error) {
          console.log('Error creating new user:', error);
        });
}

module.exports = {
    cretateUser
}