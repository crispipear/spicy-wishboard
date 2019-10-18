var express         = require('express'),
    bodyParser      = require('body-parser'),
    cors            = require('cors'),
    path            = require('path'),
    user            = require('./backend/user')

const app = express();

// Serve the static files from the React app
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

//routes
app.use('/user', user)

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Catch 404
app.use((req, res, next) => {
    let err = new Error('Route Not Found')
    err.status = 404
    next(err)
})


const port = process.env.PORT || 3001;
app.listen(port);

console.log('App is listening on port ' + port);