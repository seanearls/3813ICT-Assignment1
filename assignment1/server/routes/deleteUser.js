const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

///////Route for deleting a user


router.post('/', (req, res) => {

    var deleted = req.body.username
    var toDelete;

    fs.readFile('users.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            toDelete = JSON.parse(data);

            for (user in toDelete) {
                if (toDelete[user].username == deleted) {
                    delete toDelete[user];
                    break;
                }
            }
            let newData = JSON.stringify(toDelete.filter(element => Object.keys(element).length));
            console.log(newData);
            fs.writeFile('users.json', newData, 'utf-8', function(err) {
                if (err) throw err;
            res.send({'username':deleted, 'deleted':true});
            });
        }
    });
});


module.exports = router;