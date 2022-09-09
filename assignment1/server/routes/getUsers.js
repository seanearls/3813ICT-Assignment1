const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

router.post('/', (req, res) => {
    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var users = JSON.parse(data);
            console.log({users});
            res.send({users});
        }
    });
})

module.exports = router;