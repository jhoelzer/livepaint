// Add logic to this script to poll server every second for updated pixels.
let clientUpdates = [];

function pollReq() {
    console.log(clientUpdates);
    const postMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientUpdates: clientUpdates })
    };

    fetch("/updates", postMethod)
        .then(res => res.json())
        .then(data => {
            if (data.updates.length) {
                for (update of data.updates) {
                    bitmap.updateColor(update[0], update[1], update[2]);
                }
            }
        });
    clientUpdates = [];
    setTimeout(pollReq, 1000);
}

pollReq();