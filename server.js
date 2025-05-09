const WebSocket = require('ws');

// Start WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  ws.on('message', (data) => {
    // Broadcast to other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('⚠️ WebSocket error:', err.message);
  });
});

console.log('🚀 WebSocket server running on ws://localhost:8080');
