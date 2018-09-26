const express = require('express')
const app     = express()
const server  = require('http').Server(app)
const io      = require('socket.io').listen(server)
const path    = require('path')
const morgan  = require('morgan')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000;
const url  = process.env.MONGO_URL || 'mongodb://localhost:27017/chat'

const Chat    = require('./src/models/chat')
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
//////
app.set('port', port)

/////
app.use(express.static(path.join(__dirname + '/src/public')));

app.use(morgan('dev'));



/////////////
/*
MongoCliente. (url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

  db.close();
})*/

app.get('/hello', function(req, res) {
    res.status(200).send("Hello World!");
  });
  app.get('/chat', function(req, res) {
      Chat.find( (err,messages) =>{
          if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
          if(!chat) return res.status(404).send({message: `No existe`})
          res.status(200).send({ chat })
      })
    });
  
  app.get('/', function(req, res){
      console.log("URL: localhost:3000", req.url)
      res.sendFile('index.html')     
  })
  
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
/*
  mongoose.connect('mongodb://localhost:27017/chat')

  var db = mongoose.connection
  db.on('error', console.error.bind(console,'connection error:'))
  db.once('open', function(){
      console.log('connected to mongodb')
  })*/
/*
mongoose.connect(url, (err,res) => {
    if(err)
        console.error('Please make sure Mongodb is running!')
    throw err
    console.log("Connected to MongoDB")
    
    server.listen(port, function () {
        console.log('Server on port', port)
    })
})
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))*/
/*
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(serverConfig.mongoURL, (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
      }  
      // feed some dummy data in DB.
      dummyData();
    });
  }
*/

