const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const e = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

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

        collection.findOne({'username':username})
        .then(response => {
            if(response){
                res.send({'username': username, "valid":false, "existing": true})
            } else {
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
    })
})

//Route for creating new user
router.post('/', (req, res) => {
    var newUser;
    var newUsername = req.body.username;
    var newEmail = req.body.email;
    var newRole = req.body.role;
    var newUpwd = req.body.upwd;

    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            newUser = JSON.parse(data);
            newUser.push({'username':newUsername, 'email':newEmail, 'role':newRole});
            newUser = JSON.stringify(newUser);
            fs.writeFile('users.json', newUser, 'utf-8', function(err) {
                if (err) throw err;
                res.send({'username':newUser, 'registered':true});
            });
        }
    });

})

module.exports = router;