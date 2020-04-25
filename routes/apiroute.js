const fs = require("fs");

const noteData = require("../db/db.json");
// console.log(noteData);

module.exports = function (app) {

    //READ
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });
    //SAVE
    app.post("/api/notes", function (req, res) {
        if (noteData) {
            noteData.push(req.body);
            res.json(noteData);
        }else{
            res.send("No notes yet!")
        }
        // res.json(noteData);
        // id key
    });
    //DELETE
    app.delete("/api/notes/:id", function (req, res) {
        res.json(noteData);
    });

}