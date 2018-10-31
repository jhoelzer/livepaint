// Add logic to this script to poll server every second for updated pixels.
let updateQueue = [];
let userIndex = 0;

function pollReq() {
    let clientUpdates = updateQueue;
    const postMethod = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "clientupdates": clientUpdates,
            "userIndex": userIndex
        })
    };

    fetch('/updates', postMethod)
        .then(res => res.json())
        .then(serverUpdates => {
            console.log(serverUpdates);
            userIndex = serverUpdates.serverIndex;
            serverUpdates.updates.forEach(updateColor => {
                bitmap.updateColor(updateColor[0], updateColor[1], updateColor[2])
            });
            
            updateQueue = updateQueue.slice(clientUpdates.length);

            setTimeout(pollReq, 1000);
        });
};

pollReq();