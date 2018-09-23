const express = require('express')
const app     = express()
const server  = require('http').Server(app)
const io      = require('socket.io')(server)

const port = 3000;


const messages = [{
    author: "Carlos",
    text: "Hola! que tal?"
},{
	author: "Pepe",
    text: "Muy bien! y tu??"
},{
	author: "Paco",
    text: "Genial!"
}]
app.use(express.static('./public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(port, function () {
    console.log('Server on port', port)
})
