const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Creating a new channel

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

        //Making sure the channel name doesnt already exist in the group
        collection.findOne({'groupID': groupID, 'cName': channelName})
        .then(response => {
            if(response){
                res.send({'channelName':channelName, 'channelMade': false, 'existing': true});
            } else {
                //Inserting the new channel into the database
                collection.insertOne({
                    'groupID': groupID,
                    'chanID': newID,
                    'cName': channelName,
                    'messages': [],
                    'users': admins
                })
                .then(res.send({'channelName': channelName, 'channelMade': true}))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    });
});

module.exports = router;