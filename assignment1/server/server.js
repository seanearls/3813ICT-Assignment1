const express = require('express'); //Import express module
const app = express(); //Calling top-level express function
const server = require('http').Server(app);
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

app.use (bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/assignment1')));

require('./listen.js')(server);



/////////////////Routes////////////////////
//////Login
const authRoute = require('./routes/auth', (app, path));
app.use('/auth', authRoute);

//////Get Users
const usersRoute = require('./routes/getUsers', (app, path));
app.use('/getUsers', usersRoute);

//////Create New User
const newUserRoute = require('./routes/onNewUser', (app, path));
app.use('/onNewUser', newUserRoute);

//////Edit User
const editUserRoute = require('./routes/editUser', (app, path));
//app.use('/editUser', editUserRoute);

//////Delete User
const deleteRoute = require('./routes/deleteUser', (app, path));
app.use('/deleteUser', deleteRoute)

//////Get Groups
const groupsRoute = require('./routes/getGroups', (app, path));
app.use('/getGroups', groupsRoute);

//////New Group
const newGroupRoute = require('./routes/newGroup', (app, path));
app.use('/newGroup', newGroupRoute);

//////Delete Group
const deleteGroupRoute = require('./routes/deleteGroup', (app, path));
app.use('/deleteGroup', deleteGroupRoute);

//////New Channel
const newChannelRoute = require('./routes/newChannel', (app, path));
app.use('/newChannel', newChannelRoute);

//////Delete Channel
const deleteChannelRoute = require('./routes/deleteChannel', (app, path));
app.use('/deleteChannel', deleteChannelRoute);
