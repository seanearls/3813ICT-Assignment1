const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    var username = req.body.username;
    var newUsername = req.body.newUsername;
    var email = req.body.email;
    var role = req.body.role;

    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName = 'chat_app'
        const db = client.db(dbName);
        const collection = db.collection('users');

        collection.updateOne(
            {"username": username},
            { $set: {
                'username': newUsername,
                'email': email,
                'role': role
            }}
        )
        .then(res.send({'username': newUsername, 'success': true}))
        .catch(err => console.log(err));
    })
})

module.exports = router;