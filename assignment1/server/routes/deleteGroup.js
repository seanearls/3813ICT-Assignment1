const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

//////Route for deleting a group


router.post('/', (req, res) => {
    var deleted = req.body.gName
    var toDelete;

    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log("ggggg" + err);
        } else {
            toDelete = JSON.parse(data);
            console.log("GGGgggg" + toDelete)

            for (group in toDelete) {
                if (toDelete[group].gName == deleted) {
                    console.log("To delete " + toDelete[group])
                    delete toDelete[group];
                    break;
                }
            }
            let newData = JSON.stringify(toDelete.filter(element => Object.keys(element).length));
            console.log(newData);
            fs.writeFile('groups.json', newData, 'utf-8', function(err) {
                if (err) throw err;
            res.send({'gName': deleted, 'deleted': true});
            });
        }
    });
});

module.exports = router;