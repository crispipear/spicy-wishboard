var   express = require('express'),
      router = express.Router(),
      firebase = require('./firebase'),
      uuidv4 = require('uuid/v4');

const TAG = 'USER_ROUTE'

router.all('*', (req, res, next) => {
  req.TAG = `${TAG}, ${req.path}`;
  next();
})

router.post('/create', (req, res) => {
  const user = req.body
  let uid = uuidv4();
  firebase.auth.createUser({
      uid,
      email: user.email,
      displayName: user.username,
      password: user.password
  }).then(userRecord => {
    res.status(200).json({'message': 'create account successful'})
    console.log('created account: ' + uid)
  }).catch(err => {
    res.status(400).json({'message': 'failed to create account: ' + err})
    console.log('create account error: ' + err)
  })
})

module.exports = router