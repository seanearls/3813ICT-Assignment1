const app = require('express');
const router = app.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Removing an assistant from a group

router.post('/', (req, res) => {
    var username = req.body.user;
    var groupID = req.body.groupID;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app';
        const db = client.db(dbName);
        const collection = db.collection('groups');

        //removing the username from the assistant array in the corresponding group
        collection.updateOne(
            {"ID": groupID},
            { $pull: { "assistants": username }}
        )
        .then(res.send({'removedAssistant':username, 'userDemoted': true}))
        .catch(err => console.log(err));
    });
});

module.exports = router;