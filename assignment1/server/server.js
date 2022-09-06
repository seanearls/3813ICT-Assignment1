const express = require('express'); //Import express module
const app = express(); //Calling top-level express function
const server = require('http').Server(app);
const io = require('socket.io')(server)
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { stringify } = require('querystring');

app.use (bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/assignment1')));

require('./sockets.js')(app, io);
require('./listen.js')(server);

app.post('/api/auth', function(req,res){
    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            res.send({"username": "", "valid": false});
        } else {
            var users = JSON.parse(data);
            var user={};
            user.username = req.body.username;
            user.upwd = req.body.upwd;
            user.valid = false;

            for (let i=0; i<users.length; i++){
                console.log(users);
                if (user.username == users[i].username && user.upwd == users[i].upwd){
                    user = {'username':users[i].username, 'email':users[i].email, 'role':users[i].role, 'valid':true};
                    console.log(user);
            }
        }
        res.send(user);
    }});
});

/*app.post('api.users', (req, res) => {
    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var userData = json.parse(data);
            res.send({userData});
        }
    });   
});*/