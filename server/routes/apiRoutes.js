const fs = require('fs');
const db = require("../../db/db.json");
const id = require("../../db/currentID.json");


module.exports = function(app) 
{
    app.get("/api/notes", function(req, res) 
    {
        // This may not be working correctly.
        res.json(db);
    });

    app.post("/api/notes", function(req, res)
    {
        db.push(req.body);
        fs.writeFileSync("db/db.json", JSON.stringify(db));
        res.json(req.body);
    });

    app.delete("/api/notes/:id", function(req, res) 
    {
        db.forEach(element => 
        {
            if(element.id == req.params.id)
            {
                console.log('correct id');
            }
            else
            {
                console.log('not the id');
            }
        });

        res.json({ ok: true });
    });
};