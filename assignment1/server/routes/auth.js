const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

router.post('/', function(req,res){
    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            res.send({"username": "", "valid": false});
        } else {
            var users = JSON.parse(data);
            var user={};
            user.username = req.body.username;
            user.upwd = req.body.upwd;
            user.valid = false;

            for (let i=0; i<users.length; i++){
                console.log(users);
                if (user.username == users[i].username && user.upwd == users[i].upwd){
                    user = {'username':users[i].username, 'email':users[i].email, 'role':users[i].role, 'valid':true};
                    console.log(user);
            }
        }
        res.send(user);
    }});
});

module.exports = router