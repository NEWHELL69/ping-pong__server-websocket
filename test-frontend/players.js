(function(){
    // @connect
    // Connect to the websocket
    let socket;
    // This will let us create a connection to our Server websocket.
    // For this to work, your websocket needs to be running with node index.js
    const connect = async function() {
        // Return a promise, which will wait for the socket to open
        await (new Promise((resolve, reject) => {
            // This calculates the link to the websocket. 
            const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
            const port = 3000;
            const socketUrl = `${socketProtocol}//${window.location.hostname}:${port}/player/`

            let intervalId;
            
            // Define socket
            // If you are running your websocket on localhost, you can change 
            // socketUrl to 'http://localhost:3000', as we are running our websocket
            // on port 3000 from the previous websocket code.
            socket = new WebSocket(socketUrl);

            // This will fire once the socket opens
            socket.onopen = (e) => {
                console.log("Controller connected to server")

                intervalId = setInterval(() => {
                    socket.send(JSON.stringify(
                        {
                            'direction': 1,
                            'pressed': 1
                        }
                    ))
                }, 2000)
            }

            // This will fire on error
            socket.onerror = (e) => {
                // Return an error if any occurs
                console.log('error' + e);
                resolve();
            }

            socket.onclose = (code) => {
                console.log("Client side player socket closed -> " + code);
                clearInterval(intervalId);
                resolve();
            }
        }));

        if(!isOpen(socket)){
            console.log("Retrying to connect controller")
            connect();
        }
    }

    // @isOpen
    // check if a websocket is open
    const isOpen = function(ws) { 
        return ws.readyState === ws.OPEN 
    }

    connect();
})();

(function(){// @connect
    // Connect to the websocket
    let socket;
    // This will let us create a connection to our Server websocket.
    // For this to work, your websocket needs to be running with node index.js
    const connect = async function() {
        // Return a promise, which will wait for the socket to open
        await (new Promise((resolve, reject) => {
            // This calculates the link to the websocket. 
            const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
            const port = 3000;
            const socketUrl = `${socketProtocol}//${window.location.hostname}:${port}/player/`
            
            let intervalId;

            // Define socket
            // If you are running your websocket on localhost, you can change 
            // socketUrl to 'http://localhost:3000', as we are running our websocket
            // on port 3000 from the previous websocket code.
            socket = new WebSocket(socketUrl);
    
            // This will fire once the socket opens
            socket.onopen = (e) => {
                console.log("Controller connected to server")
                // Send a little test data, which we can use on the server if we want  
                intervalId = setInterval(() => {
                    socket.send(JSON.stringify(
                        {
                            'direction': 0,
                            'pressed': 0
                        }
                    ))
                }, 2000)
            }
    
            // This will fire on error
            socket.onerror = (e) => {
                // Return an error if any occurs
                console.log('error' + e);
                resolve();
            }

            socket.onclose = (code) => {
                console.log("Client side player socket closed -> " + code);
                clearInterval(intervalId);
                resolve();    
            }
        }));
    
        if(!isOpen(socket)){
            console.log("Retrying to connect controller")
            connect();
        }
    }
    
    // @isOpen
    // check if a websocket is open
    const isOpen = function(ws) { 
        return ws.readyState === ws.OPEN 
    }
    
    connect();
})()