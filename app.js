/**
 * Created by Naitik Soni on.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>, optional hostname
app.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

var noteSchema = mongoose.Schema({
    Client_Name : String,
    Company_Name: String,
    Phone_Number: String,
    Email_Address: String,
    Address: String,
    City: String,
    State: String,
    Country: String,
    Postal_Code: String

});
var note = mongoose.model('note',noteSchema);

var login = mongoose.Schema({
    userName: String,
    password: String
});
var logindb = mongoose.model('logindb', login);


app.post('/registration', function(req, res){
    var doc = new logindb({userName:req.body.userName, password:req.body.password});
    doc.save(function(err){
        if(err)
            res.json({result:false});
        res.json({result:true});
    });
});

app.post('/login',function(req,res){
    logindb.find({userName:req.body.userName, password:req.body.password}).exec(function(err, data){
        if(err){
            res.send(false);
        } else {
            res.send(data);
        }

    });
});

//post request for adding note to database
// try,catch,finally for differentiate note. is it Math expression or text

app.post('/note',function(req,res){
    var doc = new note({
        Client_Name : req.body.Client_Name,
        Company_Name: req.body.Company_Name,
        Phone_Number: req.body.Phone_Number,
        Email_Address: req.body.Email_Address,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        Country: req.body.Country,
        Postal_Code: req.body.Postal_Code})

    doc.save(function(err){
        if(err)
            res.json({result:false});
        res.json({result:true});
    });
});

//Get request for getting list of notes from database
app.get('/note',function(req,res){
    note.find().exec( function(err,notes){
        res.send(notes);
    });
});

//put request for update selected note to database
// try,catch,finally for differentiate note. is it Math expression or text
app.put('/note',function(req,res){
        note.findByIdAndUpdate(req.body.id, { $set: { Client_Name : req.body.cn,
                                                        Company_Name: req.body.cmp,
                                                        Phone_Number: req.body.pn,
                                                        Email_Address: req.body.email,
                                                        Address: req.body.ad,
                                                        City: req.body.city,
                                                        State: req.body.state,
                                                        Country: req.body.country,
                                                        Postal_Code: req.body.pc} }, function (err, tank) {
                                                            if (err)  res.send({result:false});
                                                            res.send({result:true});
                                                        });
});

//delete request for deletion of selected note to database
app.delete('/note',function(req,res){
    note.remove({ _id: req.query.id }, function (err) {
        if (err) res.send({result:false});
        res.send({result:true});
    });
});



