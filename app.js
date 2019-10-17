var express         = require('express'),
    bodyParser      = require('body-parser'),
    cors            = require('cors'),
    path            = require('path'),
    userFuncs       = require('./backend/user')

const app = express();

// Serve the static files from the React app
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/create-account', urlencodedParser, (req, res) => {
    userFuncs.cretateUser(req.body)
        .then(res => res.status(200).json({'message': res}))
        .catch(err => res.status(400).json({'message':"bad request" + err}))
    
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



const port = process.env.PORT || 3001;
app.listen(port);

console.log('App is listening on port ' + port);