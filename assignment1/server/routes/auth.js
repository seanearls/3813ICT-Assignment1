const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Logging a user in.

router.post('/', function(req, res){
    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if (err){return console.log(err)}
        const dbName = 'chat_app'
        const db = client.db(dbName);
        const collection = db.collection('users');
        let username = req.body.username;
        let upwd = req.body.upwd;

        //Checking if the user exists.
        collection.findOne({'username':username})
        .then(response => {
            if (response){
                //Checking if input password is correct.
                if (response.upwd === upwd){
                    user = {'username':response.username, 'email':response.email, 'role':response.role, 'valid':true}
                    res.send(user);
                } else {
                    res.send({'username': "", "valid": false});
                }
            }
        })
        .catch(err => console.log(err));
    })
});

module.exports = router;