const express = require('express'); //Import express module
const router = express.Router(); //Calling top-level express function
const path = require('path');
const fs = require('fs');

/////Route for deleting a channel

router.post('/', (req, res) => {
    var deleted = req.body.deleted
    var toDelete;
    var groupName = req.body.group

    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            toDelete = JSON.parse(data);

            for (group in toDelete) {
                if (toDelete[group].gName == groupName) {
                    for (channel in toDelete[group].channel) {
                        if (toDelete[group].channel[channel].cName == deleted) {
                            delete toDelete[group].channel[channel];
                            break;
                        }
                    }
                }
            }


            let newData = JSON.stringify(toDelete);
            fs.writeFile('groups.json', newData, 'utf-8', function(err) {
                if (err) throw err;
            res.send({'cName': deleted, 'deleted': true});
            })
        }
    })
});

module.exports = router;