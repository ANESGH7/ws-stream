const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // When the server receives a message (frame)
    ws.on('message', (message) => {
        console.log(`Received frame, size: ${message.length} bytes`);
        
        // Broadcast the frame to all clients (you can broadcast to specific clients if needed)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);  // Send the frame to the client
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
