const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

//Route for creating new channel
router.post('/', (req, res) => {
    var newChannel = {};
    var groupName = req.body.groupName
    var newId = req.body.newId;
    var cName = req.body.cName;
    var messages = req.body.messages;
    var users = req.body.users

    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            newChannel = JSON.parse(data);
            console.log(newChannel);

            for (let group in newChannel) {
                if (newChannel[group].gName === groupName) {
                    newChannel[group].channel.push({'ID': newId, 'cName': cName, 'messages': messages, 'users': users})
                }
            }
            newChannel = JSON.stringify(newChannel);
            fs.writeFile('groups.json', newChannel, 'utf-8', function (err) {
                if (err) throw err;
                res.send({'cName': newChannel, 'channelMade': true})
            });
        }
    });
});

module.exports = router;