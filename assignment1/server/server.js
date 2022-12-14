const express = require('express'); //Import express module
const app = express(); //Calling top-level express function
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sockets = require('./socket.js');
const http = require('http').Server(app);
const PORT = 3000;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
io.listen(server);

app.use (bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/assignment1')));

require('./listen.js')(server);

//Setup Socket
sockets.connect(io, PORT);


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

//////Add Assistant to Group
const addGroupAssistantRoute = require('./routes/addGroupAssistant');
app.use('/addGroupAssistant', addGroupAssistantRoute);

//////Remove Assistant from Group
const removeGroupAssistantRoute = require('./routes/removeGroupAssistant');
app.use('/removeGroupAssistant', removeGroupAssistantRoute);

const getAssistantsRoute = require('./routes/getAssistants');
app.use('/getAssistants', getAssistantsRoute);