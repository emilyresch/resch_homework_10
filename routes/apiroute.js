//requires/dependencies
var fs = require("fs");
var noteData = require("../db/db.json");

//GET POST and DELETE METHODS
module.exports = function (app) {

    //READ
    app.get("/api/notes", function (req, res) {
        //show db.json
        res.send(noteData);
    });

    //CREATE, SAVE, SEND
    app.post("/api/notes", function (req, res) {

        console.log(req);
        
        //create random ID number for a new note
        var noteId = Math.floor(Math.floor(Math.random() * 10));
        //create newNote object setup so there's an ID key/value pair
        var newNote = {
            // title: req.body.title,
            // text: req.body.text,
            id: noteId
        };

        // read the JSON file, parse the data
        fs.readFile('../db/db.json', "utf8", function (err, res) {
            if (err) throw err;
            var everyNote = JSON.parse(res);
            //push user's new note into the JSON object
            everyNote.push(newNote);
            //stringify user's new note and append it to the JSON file
            fs.appendFile('../db/db.json', JSON.stringify(everyNote), function (err) {
                if (err) throw err;
                //send/show user the note data
                res.send(noteData);
                //test that new note is created
                console.log("new note created");
            });

        });
    });


    // DELETE notes
    app.delete("/api/notes/:id", function (req, res) {

        //create variable to hold request parameters (specifically note's id)
        var noteId = req.params.id;

        //read db JSON file and parse
        fs.readFile('../db/db.json', "utf8", function (err, res) {
            if (err) throw err;
            var everyNote = JSON.parse(res);
            //use filter to create a new array that includes all notes but the one with the matching ID
            var newEveryNote = everyNote.filter(note => note.id != noteId);
            fs.writeFile("./db/db.json", JSON.stringify(newEveryNote, null, 2), err => {
                if (err) throw err;
                //send/show user the updated note data
                res.send(noteData);
                console.log("deleted note")
            });

            // res.send(noteData);
        });
    });

}
