const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


router.post('/', function(req, res){
    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if (err){return console.log(err)}
        const dbName = 'chat_app'
        const db = client.db(dbName);
        const collection = db.collection('users');
        let username = req.body.username;
        let upwd = req.body.upwd;

        collection.findOne({'username':username})
        .then(response => {
            if (response){
                if (response.upwd === upwd){
                    if (upwd === response.upwd){
                        user = {'username':response.username, 'email':response.email, 'role':response.role, 'valid':true}
                        res.send(user);
                    }
                } else {
                    res.send({'username': "", "valid": false});
                }
            }
        })
        .catch(err => console.log(err));
    })
});

module.exports = router;