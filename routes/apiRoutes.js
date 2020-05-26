let notes = require("../db/db.json");
const fs = require("fs");
const path = require("path");

const db_dir = path.resolve(__dirname, "../db");
const dbPath = path.join(db_dir, "db.json");

module.exports = function(app) {
    // API GET Request
    app.get("/api/notes", function(req, res) {
        //Read db.json file and return notes array
        fs.readFile(dbPath, 'utf8', function(err, data) {
            if(err) {
                throw err;
            } else {
                let notesArr = JSON.parse(data);
                return res.json(notesArr);
            }
        })
    });

    // API POST Request
    app.post("/api/notes", function(req, res) {
        fs.readFile(dbPath, 'utf8', function(err, data) {
            if(err) {
                throw err;
            } else {
                let notesArr = JSON.parse(data);
                //Assign ID and push new note
                req.body.id = `${notesArr.length}`;
                notesArr.push(req.body);
                //Rewrite updated notes to db file
                fs.writeFile(dbPath, JSON.stringify(notesArr, null, '\t'), 'utf8', function(err) {
                    if (err) throw err;
                })
                return res.json(true);
            }
        })
    });

    //API DELETE Request
    app.delete("/api/notes/:id", function(req, res) {
        const deletedId = req.params.id;
        fs.readFile(dbPath, 'utf8', function(err, data) {
            if(err) {
                throw err;
            } else {
                let notesArr = JSON.parse(data);
                for (let i = 0; i < notesArr.length; i++) {
                    if (deletedId === notesArr[i].id) {
                        //Create new notes array without selected ID object
                        let newNotes = notesArr.filter(item => item.id !== deletedId);
                        //Reassign IDs
                        for (let j=0; j<newNotes.length; j++) {
                            newNotes[j].id = JSON.stringify(j);
                        };
                        //Rewrite new notes to db file
                        fs.writeFile(dbPath, JSON.stringify(newNotes, null, '\t'), 'utf8', function(err) {
                            if (err) throw err;
                        });
                        return res.json(true);
                    }
                };
                // If id doesn't exist, return false
                return res.json(false);
            }
        })
    });
};