var   express = require('express'),
      router = express.Router(),
      fb = require('../app.js')

const TAG = 'USER_ROUTE'

router.all('*', (req, res, next) => {
  req.TAG = `${TAG}, ${req.path}`;
  next();
})

router.get('/', (req, res) => {
  res.send('user backend test')
})

router.post('/create', (req, res) => {
  const user = req.body
  console.log(user)
  fb.auth().createUserWithEmailAndPassword(user.email, user.password).then(response => {
    res.status(200).json({'message': 'create account successful'})
    console.log('created account: ' + response.user.uid)
    fb.database().ref(`users/${response.user.uid}`).set({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      groups: {0: user.groupId}
    });
  }).catch(err => {
    res.status(400).json({'message': 'failed to create account: ' + err.message})
    console.log('create account error: ' + err.message)
  })
})

router.post('/signout', (req, res) => {
  fb.auth().signOut()
})

router.post('/login', (req, res) => {
  const user = req.body
  fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(user => {
      res.status(200).send({user})
    })
    .catch(err => {
      res.status(400).json({'message': err.message})
    })
})


module.exports = router