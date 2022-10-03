const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    var chanID = req.body.chanID
    var groupID = req.body.groupID

    MongoClient.connect(url, {maxPoolSize: 10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName='chat_app'
        const db = client.db(dbName);
        const collection = db.collection('channels');

        collection.deleteOne({'chanID':chanID, 'groupID':groupID})
        .then(res.send({'chanID':chanID, 'groupID':groupID, 'deleted':true}))
        .catch(err => console.log(err));
    })
})


module.exports = router;