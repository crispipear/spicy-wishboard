var   express = require('express'),
      router = express.Router(),
      fb = require('../app.js')

const TAG = 'WISHBOARD_ROUTE'

router.all('*', (req, res, next) => {
  req.TAG = `${TAG}, ${req.path}`;
  next();
})

router.post('/validate-groupId', (req, res, next) => {
    console.log(req.body)
    const reqId = req.body.reqId
    fb.database().ref('/groups').once('value').then(snapshot => {
        if(snapshot.hasChild(reqId)){
            res.status(200).send({
                idFound: true
            })
        }else{
            res.status(200).send({
                idFound: false,
                message: `id ${reqId} is an invalid group id`
            })
        }
    });
})


module.exports = router