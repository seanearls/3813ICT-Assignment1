const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName = 'chat_app';
        const db = client.db(dbName);
        const collection = db.collection('users');
        let username = req.body.username;

        if (username === "super") {
            res.send({"username": username, "deleted": false, "isSuper": true});
        } else {
            collection.deleteOne({'username': username})
            .then(res.send({'username': username, 'deleted' :true}))
            .catch(err => console.log(err));
        }
    });
});


module.exports = router;