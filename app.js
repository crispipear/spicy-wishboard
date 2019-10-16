const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

var userFuncs = require('./backend/user');

// Serve the static files from the React app
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/user', (req,res) => {
    res.send("hello")
    userFuncs.cretateUser({email: 'crispipear@gmail.com', password: 'testing123'})
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);