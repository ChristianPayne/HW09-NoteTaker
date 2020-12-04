const fs = require('fs');
const db = require("../../db/db.json");
const id = require("../../db/currentID.json");


function saveDBFile()
{
    fs.writeFileSync("db/db.json", JSON.stringify(db));
}

function saveIDFile()
{
    fs.writeFileSync("db/currentID.json", JSON.stringify(id));
}

module.exports = function(app) 
{
    app.get("/api/notes", function(req, res) 
    {
        // This may not be working correctly.
        res.json(db);
    });

    app.post("/api/notes", function(req, res)
    {
        // Grab the body.
        const newReq = req.body;
        // Increment the id.
        id.currentID += 1;
        // Set the id.
        newReq.id = id.currentID;
        // Push the new req into the db array.
        db.push(newReq);
        // Send back the new req.
        res.json(newReq);

        // Save the files.
        saveDBFile();
        saveIDFile();

        console.log(newReq);
        console.log(id);
    });

    app.delete("/api/notes/:id", function(req, res) 
    {
        let foundMatch = false;
        db.forEach((element, index) => 
        {
            if(element.id == req.params.id)
            {
                // We have found an id match.
                foundMatch = true;
                // Delete the found match from the array.
                db.splice(index,1);
                // Save the db file again.
                saveDBFile();
            }

        });
        
        if(!foundMatch)
        {
            res.json({ ok: false });
        }
        else
        {
            res.json({ ok: true });
        }
        
    });
};