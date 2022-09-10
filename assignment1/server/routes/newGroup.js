const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

//Route for creating new group
router.post('/', (req, res) => {
    var newGroup = {};
    var users = req.body.users;
    var groupName = req.body.gName;
    var newId = req.body.newId;

    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            newGroup = JSON.parse(data);
            newGroup.push({'ID': newId, 'gName': groupName, 'users': users, 'assistants': users, 'channel': []});
            newGroup = JSON.stringify(newGroup);
            fs.writeFile('groups.json', newGroup, 'utf-8', function(err) {
                if (err) throw err;
                res.send({'groupName': newGroup, 'groupMade': true});
            });
        }
    })
});

module.exports = router;