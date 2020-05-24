var notes = require("../db/db.json");
var fs = require("fs");

module.exports = function(app) {
    // API GET Request
    app.get("/api/notes", function(req, res) {
      res.json(notes);
    });

    // API POST Request
    app.post("/api/notes", function(req, res) {
        notes.push(req.body);
        res.json(true);
    });

    //API DELETE Request
    app.delete("/api/notes/:id", function(req, res) {
        var selectedId = req.params.id;

        for (var i = 0; i < notes.length; i++) {
            if (selectedId === notes[i].id) {
                //New notes array without selected ID object
                var newNotes = notes.filter(item => item.id !== selectedId);
                //Rewrite new notes to db file
                fs.writeFile("db.json", newNotes, function(err) {
                    if (err) throw err;
                });
                return res.json(true);
            }
        };
        //If id doesn't exist, return false
        return res.json(false);
    });
};