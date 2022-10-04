const app = require('express');
const router = app.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    var username = req.body.user;
    var groupID = req.body.groupID;
    console.log(username, groupID);

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('groups');

        collection.updateOne(
            {"ID": groupID},
            { $push: { 'users': username }}
        )
        .then(res.send({'addedUser':username, 'userAdded': true}))
        .catch(err => console.log(err));
    });
});


module.exports = router;