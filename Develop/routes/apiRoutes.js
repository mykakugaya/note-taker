let notes = require("../db/db.json");
const fs = require("fs");
const path = require("path");

const db_dir = path.resolve(__dirname, "../db");
const dbPath = path.join(db_dir, "db.json");

module.exports = function(app) {
    // API GET Request
    app.get("/api/notes", function(req, res) {
      res.json(notes);
    });

    // API POST Request
    app.post("/api/notes", function(req, res) {
        req.body.id = `${notes.length}`;
        notes.push(req.body);
        res.json(true);
    });

    //API DELETE Request
    app.delete("/api/notes/:id", function(req, res) {
        const deletedId = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            if (deletedId === notes[i].id) {
                //Create new notes array without selected ID object
                let newNotes = notes.filter(item => item.id !== deletedId);
                // notes.splice(deletedId, 1);

                //Reassign IDs
                for (let j=0; j<newNotes.length; j++) {
                    newNotes[j].id = j;
                }
                //Rewrite new notes to db file
                fs.writeFile(dbPath, newNotes);
                return res.json(true);
            }
        };
        // If id doesn't exist, return false
        return res.json(false);
    });
};