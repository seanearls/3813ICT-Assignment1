const app = require('express');
const router = app.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/////////Adding user to a group.

router.post('/', (req, res) => {
    var username = req.body.user;
    var groupID = req.body.groupID;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('groups');

        //Updating the user list of the group with the newly added user.
        collection.updateOne(
            {"ID": groupID},
            { $push: { 'users': username }}
        )
        .then(res.send({'addedUser':username, 'userAdded': true}))
        .catch(err => console.log(err));
    });
});


module.exports = router;