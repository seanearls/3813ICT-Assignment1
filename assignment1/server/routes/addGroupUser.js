const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

//Route for adding a user to a group
router.post('/', (req, res) => {
    var newUser = {};
    var user = req.body.user
    var group = req.body.group

    fs.readFile('groups.json', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            newUser = JSON.parse(data);

            for (let group in newUser) {
                if (newUser[group].gName === group) {
                    newUser[group].users.push(user)
                }
            }
            newUser = JSON.stringify(newUser);
            fs.writeFile('groups.json', newUser, 'utf-8', function (err) {
                if (err) throw err;
            res.send({"user": newUser, 'added': true});
            });
        }
    });
});

module.exports = router;