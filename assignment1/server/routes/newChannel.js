const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    var admins = [];
    var channelName = req.body.cName
    var newID = req.body.newID;
    var groupID = req.body.groupID;
    var admins = req.body.users;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('channels');

        collection.insertOne({
            'groupID': groupID,
            'chanID': newID,
            'cName': channelName,
            'messages': [],
            'users': admins
        })
        .then(res.send({'channelName': channelName, 'channelMade': true}))
        .catch(err => console.log(err));
    });
});

module.exports = router;