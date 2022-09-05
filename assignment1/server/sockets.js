module.exports = function(app, io){
    io.on('connection', (socket)=>{
        console.log("User connected.");

        socket.on('disconnect', function(){
            console.log("User disconnected.");
        });
        
        socket.on('add-message', (message)=>{
            io.emit('message', {type:'message', text: message});
        });
    });
}