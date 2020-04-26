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

        // console.log(req);
        
        //create random ID number for a new note
        // var noteId = Math.floor(Math.floor(Math.random() * 10));
        //create newNote object setup so there's an ID key/value pair
        // var newNote = {
        //     // title: req.body.title,
        //     // text: req.body.text,
        //     id: noteId
        // };
        // read the JSON file, parse the data
        var savedNotes = JSON.parse(fs.readFile('../db/db.json', function(err){
                if (err) throw err;
        }));
            
        var newNote = req.body;
        var noteID = (savedNotes.length).toString(); //get placement of element in array
        newNote.id = noteID;
            //push user's new note into the JSON object
        savedNotes.push(newNote);
            //stringify user's new note and append it to the JSON file
        fs.writeFileSync('../db/db.json', JSON.stringify(savedNotes), function (err) {
                if (err) throw err;
                //send/show user the note data
                res.json(savedNotes);
                //test that new note is created
                console.log("new note created");
            });

        });
    // });


    // DELETE notes
    app.delete("/api/notes/:id", function (req, res) {
        var savedNotes = JSON.parse(fs.readFile('../db/db.json', function(err){
            if (err) throw err;
        }));
        //create variable to hold request parameters (specifically note's id)
        var noteID = req.params.id;
        var newIDs = 0; //start 
        var newSavedNotes = savedNotes.filter(note => note.id != noteId);
        //read db JSON file and parse

        for(note of newSavedNotes){
            note.id = newIDs.toString();
            newIDs++;
        }

       
        fs.writeFileSync("./db/db.json", JSON.stringify(newSavedNotes), function(err) {
                if (err) throw err;
                //send/show user the updated note data
                res.json(newSavedNotes);
                console.log("deleted note with ID " + noteID);
            });

            // res.send(noteData);
        });
    

}

