// Import express, expressWs, and http
import express from 'express'
import expressWs from 'express-ws'

// Our port
let port = 3000;

// App and server
let app = express();

// Apply expressWs
expressWs(app);

// Get the route / 
app.get('/', (req, res) => {
    res.status(200).send("Welcome to our app");
});

// This lets the server pick up the '/ws' WebSocket route
app.ws('/ws', async function(ws, req) {
    // After which we wait for a message and respond to it
    ws.on('message', async function(msg) {
        // If a message occurs, we'll console log it on the server
        console.log(msg);
        // Start listening for messages
        // Send back some data
        ws.send(JSON.stringify({
            "append" : true,
            "returnText" : "I am using WebSockets!"
        }));
    });
});

app.listen(port)