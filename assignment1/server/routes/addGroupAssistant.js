const app = require('express');
const router = app.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Adding an assistant to a group

router.post('/', (req, res) => {
    var username = req.body.user;
    var groupID = req.body.groupID;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('groups');

        //Updating the assistant list with the newly added assistant.
        collection.updateOne(
            {"ID": groupID},
            { $push: { 'assistants': username }}
        )
        .then(res.send({'addedAssistant':username, 'userPromoted': true}))
        .catch(err => console.log(err));
    });
});


module.exports = router;