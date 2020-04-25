var fs = require("fs");

var noteData = require("../db/db.json");

// console.log(noteData);

module.exports = function (app) {

    //READ
    app.get("/api/notes", function (req, res) {
        // res.sendFile(path.join(__dirname, "..public/notes.html"));
        return res.json(noteData);
    });

    //SAVE
    app.post("/api/notes", function (req, res) {
        //create variable to make a random number
        

        var newNote = req.body;
        noteData.id = Math.floor(Math.random() * (noteData.length) *10);

        //test
        console.log(newNote);
        //push the newNote into the noteData json
        noteData.push(newNote);

        res.json(newNote);
    });
    //DELETE
    app.delete("/api/notes/:id", function (req, res) {
        
        //create variable to hold request parameters (specifically note's id)
        var deleteNote = req.params.id;
        //test
        console.log(deleteNote);
        //loop over all elements in the dbjson array and see if any id's match with note(id) that user wants to remove
        for (var i = 0; i < noteData.length; i++) {
            if (deleteNote === noteData[i].id) {
                return res.json(noteData[i]);
            }
        }

        return res.json(false);
    });

}

//  console.log(idIndex);
//  console.log(noteData);
// noteData.id = Math.floor(Math.random() * (noteData.length) + 1);
// console.log(noteData.hasOwnProperty(id));