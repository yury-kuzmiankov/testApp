var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library');

var db = mongoose.connection;

db.on('error', function (err) {
    var err = new Error('Connection was not established', err);
});

module.exports = db;
