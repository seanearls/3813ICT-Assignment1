const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    var admins = [];
    var groupName = req.body.gName;
    var newID = req.body.newID;
    var admins = req.body.users;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('groups');
        
        collection.findOne({'gName':groupName})
        .then(response => {
            if(response){
                res.send({'groupName':groupName, 'groupMade': false, 'existing': true})
            } else {
                collection.insertOne({
                    'ID': newID,
                    'gName': groupName,
                    'users': admins,
                    'assistants': admins
                })
                .then(res.send({'groupName': groupName, 'groupMade': true}))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
        
    });
});


module.exports = router;