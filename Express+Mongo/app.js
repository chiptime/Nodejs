var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/chat'

MongoClient.connect(URL,{ useNewUrlParser: true }, function(err, client) {
    if (err) return
    var db = client.db('chat')
    var collection = db.collection('messages')
    collection.insertOne({name: 'taco', text: 'taco riiico'}, function(err, result) {
        collection.find({name: 'taco'}).toArray(function(err, docs) {
            console.log(docs[0])
            client.close()
        })
    })
})

module.exports = app;
