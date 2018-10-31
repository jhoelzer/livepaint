const express = require("express")
const port = 3000
const app = express()

let updates = [];

app.use(express.static('public'))
app.use(express.json())

// Fill in your request handlers here
app.post('/updates', (req, res)=>{
    console.log(req.body);
    req.body.clientupdates.forEach(colorUpdate => {
        updates.push(colorUpdate);
    });

    let serverIndex = updates.length;
    let clientUpdates = updates.slice(req.body.userIndex)
    res.status(201);
    res.send({
        "updates": clientUpdates,
        "serverIndex": serverIndex,
    });
});

app.listen(port, console.log("Listening on port " + port));