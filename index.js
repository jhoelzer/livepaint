const express = require("express");
const port = 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json());

let updates = [];

// Fill in your request handlers here
app.post("/updates", (req, res) => {
    req.body.clientUpdates.forEach(update => {
        if (!updates.includes(update)) {
            updates.push(update);
        }
        let serverIndex = updates.length;
        let clientUpdates = updates.slice(req.body.userIndex)
        res.send({
            "updates": clientUpdates,
            "serverIndex": serverIndex
        });
    })
});

app.listen(port, console.log("Listening on port " + port));