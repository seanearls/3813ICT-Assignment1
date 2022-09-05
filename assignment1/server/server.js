const express = require('express'); //Import express module
const app = express(); //Calling top-level express function
const server = require('http').Server(app);
const io = require('socket.io')(server)
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { stringify } = require('querystring');

app.use (bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/assignment1')));

require('./sockets.js')(app, io);
require('./listen.js')(server);