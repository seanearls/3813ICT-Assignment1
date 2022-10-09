module.exports = {

    connect: function(io){
        io.on('connection', (socket) => {
            console.log("User connected.");
            socket.on("message", (message)=> {
                io.emit("message", message);
            });
            socket.on('disconnect', () => {
                console.log("User disconnected");
            })
        });
    }
}