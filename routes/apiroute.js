var fs = require("fs");
// var path = require("path");
var noteData = require("../db/db.json");
// var noteDataParse = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
// console.log(noteData);

module.exports = function (app) {

    //READ
    app.get("/api/notes", function (req, res) {
        // res.sendFile(path.join(__dirname, "..public/notes.html"));
        res.send(noteData);
    });

    //SAVE
    app.post("/api/notes", function (req, res) {

        // console.log(req);
        //receive new note to save on the request body
        // var newNote = req.body;
        var noteId = Math.floor(Math.floor(Math.random() * 10))
        var newNote = {
            title: req.body.title,
            text: req.body.text,
            id: noteId
        };

        fs.readFile('../db/db.json', "utf8", function (err, res) {
            if (err) throw err;
            var everyNote = JSON.parse(res);
            everyNote.push(newNote);
            fs.writeFile('../db/db.json', JSON.stringify(everyNote), function (err) {
                if (err) throw err;
                res.send(noteData);
                console.log("new note created");
            });

        });
    });


    // DELETE

    app.delete("/api/notes/:id", function (req, res) {

        //create variable to hold request parameters (specifically note's id)
        var noteId = req.params.id;

        fs.readFile('../db/db.json', "utf8", function (err, res) {
            if (err) throw err;
            var everyNote = JSON.parse(res);
            var newEveryNote = everyNote.filter(note => note.id != noteId);
            fs.writeFile("./db/db.json", JSON.stringify(newEveryNote, null, 2), err => {
                if (err) throw err;
                res.send(noteData);
                console.log("deleted note")
            });

            //loop over all elements in the dbjson array and see if any id's match with note(id) that user wants to remove
            // for (var i = 0; i < noteData.length; i++) {
            //     if (deleteNote === noteData[i].id) {
            //         // return res.json(noteData[i]); need splice() logic here
            //     }
            // }

            // res.send(noteData);
        });
    });

}

//  console.log(idIndex);
//  console.log(noteData);
// noteData.id = Math.floor(Math.random() * (noteData.length) + 1);
// console.log(noteData.hasOwnProperty(id));