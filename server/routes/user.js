var   express         = require('express'),
      router          = express.Router(),
      fb              = require('../../app.js'),
      authHelpers     = require('../utils/authHelpers')

const TAG = 'USER_ROUTE'

var userSignedIn = false;
var userSignedInId = '';

fb.auth().onAuthStateChanged(user => {
    if(user){
      userOnline = true;
      userSignedInId = user.uid
    }else{
      userOnline = false;
      userSignedInId = ''
    }
})


router.all('*', (req, res, next) => {
  req.TAG = `${TAG}, ${req.path}`;
  next();
})

router.get('/', (req, res) => {
  const user = fb.auth().currentUser
  if(user){
    console.log(user.uid)
  }
  res.send('user backend test')
})

router.post('/create', (req, res) => {
  const user = req.body
  console.log(user)
  fb.auth().createUserWithEmailAndPassword(user.email, user.password).then(response => {
    res.status(200).send({success: true, message: 'create account successful'})
    console.log('created account: ' + response.user.uid)
    fb.database().ref(`users/${response.user.uid}`).set({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      groups: {[user.groupId]: true}
    });
    fb.database().ref(`groups/${user.groupId}/users`).update({[response.user.uid]: true})
  }).catch(err => {
    res.status(200).send({success: false, message: err.message})
  })
})

router.post('/status', (req, res) => {
  const user = fb.auth().currentUser
  if(user || userSignedIn){
    const uid  = user.uid || userSignedInId
    res.status(200).send({online: true, uid})
  }else{
    res.status(200).send({online: false})
  }
})

router.post('/signout', (req, res) => {
  fb.auth().signOut()
    .then(response => res.sendStatus(200))
    .catch(err => {console.log(err)})
})

router.post('/login', (req, res) => {
  const user = req.body
  fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(user => {
      res.status(200).send({user, success: true})
    })
    .catch(err => {
      res.status(200).send({success: false, message: authHelpers[err.code]})
    })
})

router.get('/info/:uid', (req, res) => {
  const uid = req.params.uid
  fb.database().ref('/users/' + uid).once('value')
    .then(snapshot => {
      res.status(200).send({user: snapshot.val(), success: true})
    })
    .catch(err => {
      res.status(200).send({success: false, message: 'cannot find user'})
    })
})


module.exports = router