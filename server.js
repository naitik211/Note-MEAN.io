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
    note: String
});
var note = mongoose.model('note',noteSchema);
// Expose app
//exports = module.exports = app;
//app.get('addNote')
app.post('/addNote',function(req,res){
    var a = new note({name:req.body.name})
    a.save(function(err){
        if(err) return handleError(err);
    })
    var q = note.find().exec( function(err,person){
        console.log(person)
    });
    res.json({result:'q'})
})

app.get('/note',function(req,res){
    note.find().exec( function(err,notes){
        res.send(notes);
    });
});
app.put('/note',function(req,res){
    var noteVal = req.body.newNote ;
    try{
        var result = eval(noteVal);
        noteVal = noteVal.concat(' = ' , result);
    }
    catch(err){
        console.log(err)
    }
    finally{
        note.findByIdAndUpdate(req.body.id, { $set: { note: noteVal}}, function (err, tank) {
            if (err)  res.send({result:false});
            res.send({result:true});
        });
    }
});
app.delete('/note',function(req,res){
    note.remove({ _id: req.query.id }, function (err) {
        if (err) res.send({result:false});
        res.send({result:true});
    });
});
app.post('/note',function(req,res){
    var noteVal = req.body.note;
    try{
        var result = eval(noteVal);
        noteVal = noteVal.concat(' = ' , result);
    }
    catch(err){
        console.log(err)
    }
    finally{
        var doc = new note({note:noteVal})
        doc.save(function(err){
            if(err)
                res.json({result:false});
            res.json({result:true});
        });
    }
});
