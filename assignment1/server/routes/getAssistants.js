const express = require('express'); //Import express module
const { get } = require('./deleteUser');
const router = express.Router(); //Calling top-level express function
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post('/', (req, res) => {
    MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
        if(err){return console.log(err)}
        const dbName = 'chat_app';
        const db = client.db(dbName);
        const collection = db.collection('groups');
        const getAdmins = db.collection('users');
        let supers = [];
        let admins = [];
        let groupID = req.body.groupID;
        let role = req.body.role;
        let assistants = [];
        let nonAssistants = [];

        getAdmins.find(
            { $or: [
                {'role': 'super'},
                {'role': 'admin'}
            ]}
        ).toArray()
        .then(response => {
            for (let admin in response){
                if (response[admin].role === 'super'){
                    supers.push(response[admin].username);
                } else {
                    admins.push(response[admin].username);
                }
            }
            console.log("supers: " + supers, "admins: " + admins)
        })
        .then(
            collection.findOne({'ID': groupID})
            .then(response => {
                if (response) {
                    for (let user in response.users){
                        if (!(response.assistants.includes(response.users[user]))){
                            nonAssistants.push(response.users[user])
                        }
                    }
                    console.log("non assistants: " + nonAssistants)

                    for (let assistant in response.assistants){
                        if (response.assistants[assistant] !== "super") {
                            assistants.push(response.assistants[assistant]);
                        }
                    }
                }
                res.send({"supers": supers, "admins": admins, "assistants": assistants, "nonAssistants": nonAssistants});
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
})

module.exports = router;