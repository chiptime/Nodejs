const express = require('express');
const colors = require('colors');
const server = express();

server.get('/', function(req,res){
    res.send('<h1>Hello</h1>')
    res.end()
})

server.listen(3000, function (){
    console.log('Server on port 3000'.red)
});

/*
const http = require('http');

const handleServer = function (req,res) {
    res.writeHead(200, '')
    res.write('<h1>Hello world</h1>')
    res.end()
}

const server = http.createServer(handleServer)

server.listen(3000, function () {
    console.log('Server on port 3000')
})
*/