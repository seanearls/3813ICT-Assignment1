const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

router.post('/', (req, res) => {
    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var groups = JSON.parse(data);
            res.send({groups});
        }
    });
})

module.exports = router;