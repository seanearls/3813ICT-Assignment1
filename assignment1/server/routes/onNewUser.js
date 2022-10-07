const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

//////Creating a new user

router.post('/', (req, res) => {
    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName = 'chat_app';
        const db = client.db(dbName);
        const collection = db.collection('users');
        let username = req.body.username;
        let email = req.body.email;
        let upwd = req.body.upwd;
        let role = req.body.role;
        let ID = req.body.ID;

        //Making sure username not already in use
        collection.findOne({'username':username})
        .then(response => {
            if(response){
                res.send({'username': username, "valid":false, "existing": true})
            } else {
                //Inserting new user into the database
                collection.insertOne({
                    'username': username,
                    'email': email,
                    'role': role,
                    'ID': ID,
                    'upwd': upwd
                })
                .then(res.send({'username': username, "registered": true}))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    });
});

module.exports = router;