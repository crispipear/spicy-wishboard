const firebase = require('./firebase')
const uuidv4 = require('uuid/v4');

function cretateUser(user){
    return new Promise((resolve, reject) => {
      let uid = uuidv4();
      firebase.auth.createUser({
          uid,
          email: user.email,
          displayName: user.username,
          password: user.password
        })
        .then(userRecord => {
          resolve('account created')
          // res.status(200).send('user account created')
        })
        .catch(err => {
          reject(err)
          // res.status(400).send({status: 400, message: 'failed to create account: ' + err})
        });
    })

}

module.exports = {
    cretateUser
}