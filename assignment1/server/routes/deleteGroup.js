const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Deleting group

router.post('/', (req, res) => {
    var ID = req.body.ID

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('groups');

        //Deleting the group with matching group ID
        collection.deleteOne({'ID': ID})
        .then(res.send({'ID': ID, 'deleted': true}))
        .catch(err => console.log(err));
    })
})

module.exports = router;