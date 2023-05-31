// Import express and expressWs
const express = require('express');
const expressWs = require('express-ws')

// Initialize express and expressWs
const app = express();
const wss = expressWs(app);

// Our port
const port = 3000; 

// players and game
let player1 = null;
let player2 = null;
let game = null;

app.use(express.static('./test-frontend'));

// Get the route / 
app.get('/', (req, res) => {
    res.status(200).send("Welcome to our app");
});

app.ws('/game', function(ws, req) {
    if(!game) {
        game = ws;

        console.log("game connected.");

        game.on('message', (msg) => {
            console.log('game -> ' + msg);
        })

        game.on('close', (code) => {
            console.log("game socket closed, code -> " + code);
            game = null;
        })

        ws.on('error', () => {
            console.log(`game error`);
        })
    }
});

app.ws('/player', function(ws, req) {
    if(!player1 || !player2) {
        let player = null;

        if(!player1){
            player = '1';
            player1 = ws;

            console.log("player 1 connected.");
        } else {
            player = '2';
            player2 = ws;

            console.log("player 2 connected.");
        }

        ws.on("message", (data) => {
            let msg = JSON.parse(data);

            if(!game){
                console.log('game not connected');
            } else {
                game.send(JSON.stringify(
                    { 
                        "player" : player,
                        "direction": msg.direction,
                        "pressed": msg.pressed
                    }
                ));
            }
        })

        ws.on('close', (code) => {
            console.log(`player ${player} socket closed, code -> ` + code);
            player1 = null;
            player2 = null;
        })

        ws.on('error', (code) => {
            console.log(`player ${player} hello`);
        })
    }
});

app.listen(port);