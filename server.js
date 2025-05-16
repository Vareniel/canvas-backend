const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // izinkan semua origin (untuk testing, bisa dibatasi nanti)
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  // console.log('🟢 User connected');

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data); // kirim ke semua user lain
  });

  socket.on('disconnect', () => {
    // console.log('🔴 User disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  // console.log(`✅ Socket server running at http://localhost:${PORT}`);
});
