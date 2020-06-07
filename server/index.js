const io = require('socket.io')(3000);

users = {};
io.on("connection",socket=>{
    // socket.emit("msg","Selam");
    console.log('a user connected', socket.id);
    users[socket.id] = socket;
    socket.on('msg', (msg) => {
      console.log('message: ' + msg);
      //socket.broadcast.emit(msg)
      socket.broadcast.emit("msg",msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      // socket.broadcast.emit("msg", `${socket.id} disconnected!`);
    });
});