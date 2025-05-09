const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('✅ Client connected');
  
  ws.on('message', (data) => {
    console.log('📥 Frame received from client, size:', data.length);

    // You can send this frame to other connected clients (e.g., broadcasting)
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data); // Forward the frame to other clients
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

console.log('WebSocket server listening on ws://localhost:8080');
