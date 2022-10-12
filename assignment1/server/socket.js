const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const app = require('express');
const router = app.Router()

module.exports = {

    connect: function(io){
        io.on('connection', (socket) => {
            console.log("User connected.");

            socket.on('channelDetails', (data) => {
                MongoClient.connect(url, {maxPoolSize:10}, function(err, client) {
                    if(err){return console.log(err)}
                    const dbName = 'chat_app';
                    const db = client.db(dbName);
                    const collection = db.collection('chatHistory');
                    console.log(1);

                    collection.find({$and: [{'groupID': data.groupID}, {"chanID": data.chanID}]}).toArray((err, data) => {
                        let messages = data.messages;
                    });
                    
                    //Announcing a user has joined the room.
                    io.emit('announcement', data.username + " has joined the chat.");

                    //Disconnecting a user and announcing to the room.
                    socket.on('disconnect', () => {
                        console.log(data.username + " disconnected.");
                        io.emit('announcement', data.username + " has left the chat.")
                    });

                    //User sends a message. The message is emitted, and added to the message collection of the database.
                    socket.on('message', (message) => {
                        io.emit("message", message.username + ": " + message.message);
                        collection.insertOne({
                            'groupID': data.groupID,
                            'chanID': data.chanID,
                            'user': message.username,
                            'message': message.message
                        });
                    });
                });
            });
        });
    }
}