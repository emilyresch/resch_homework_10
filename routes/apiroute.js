//requires/dependencies
var fs = require("fs")
var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
console.log(noteData);


//GET POST and DELETE METHODS
module.exports = function (app) {

    //READ
    app.get("/api/notes", function (req, res) {
        //show db.json
        res.json(noteData);
    });

    //CREATE, SAVE, SEND
    app.post("/api/notes", function (req, res) {
        // console.log(req);
        //create id numbers randomly
        var noteId = noteData.length * Math.floor(Math.random() * 5);
        //define what a new note is - comes from the request body
        var newNote = req.body;
        //give new property to note object
        newNote.id = noteId;

        //push user's new note into the JSON object
        noteData.push(newNote);
        res.json(noteData);
    });
  


    // DELETE notes
    app.delete("/api/notes/:id", function (req, res) {

        //create variable to hold request parameters (specifically note's id) as a number
        paramsNum = parseInt(req.params.id);

        //loop over the array of note objects
        for (let i = 0; i < noteData.length; i++) {
            //if parameter id number matches the number of the note, splice it from the array of noteData
            if (paramsNum === noteData[i].id) {
                noteData.splice(i, 1);
            }

        }
        //send json as a response
        res.json(noteData);
        
    });


}
