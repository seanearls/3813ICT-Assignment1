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
var authRoute = require('./routes/auth');
app.use('/auth', authRoute);

//////Get Users
const usersRoute = require('./routes/getUsers');
app.use('/getUsers', usersRoute);

//////Create New User
const newUserRoute = require('./routes/onNewUser');
app.use('/onNewUser', newUserRoute);

//////Edit User
const editUserRoute = require('./routes/editUser');
app.use('/editUser', editUserRoute);

//////Delete User
const deleteRoute = require('./routes/deleteUser');
app.use('/deleteUser', deleteRoute)

//////Get Groups
const groupsRoute = require('./routes/getGroups');
app.use('/getGroups', groupsRoute);

//////Get Channels
const channelsRoute = require('./routes/getChannels');
app.use('/getChannels', channelsRoute);

//////New Group
const newGroupRoute = require('./routes/newGroup');
app.use('/newGroup', newGroupRoute);

//////Delete Group
const deleteGroupRoute = require('./routes/deleteGroup');
app.use('/deleteGroup', deleteGroupRoute);

//////New Channel
const newChannelRoute = require('./routes/newChannel');
app.use('/newChannel', newChannelRoute);

//////Delete Channel
const deleteChannelRoute = require('./routes/deleteChannel');
app.use('/deleteChannel', deleteChannelRoute);

/////Add User to Group
const addGroupUserRoute = require('./routes/addGroupUser');
app.use('/addGroupUser', addGroupUserRoute);

//////Remove User from Group
const removeGroupUserRoute = require('./routes/removeGroupUser');
app.use('/removeGroupUser', removeGroupUserRoute);
