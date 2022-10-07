const app = require('express');
const router = app.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Removing a user from a group

router.post('/', (req, res) => {
    var username = req.body.user;
    var groupID = req.body.groupID;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app';
        const db = client.db(dbName);
        const collection = db.collection('groups');

        //removing the username from the users array in the corresponding group
        collection.updateOne(
            {"ID": groupID},
            { $pull: { "users": username }}
        )
        .then(res.send({'removedUser':username, 'userRemoved': true}))
        .catch(err => console.log(err));
    });
});

module.exports = router;