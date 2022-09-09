const app = require('express');
const router = app.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

//Route for creating new user
router.post('/', (req, res) => {
    var newUser;
    var newUsername = req.body.username;
    var newEmail = req.body.email;
    var newRole = req.body.role;

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