require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const conversationRoutes = require('./routes/conversationRoutes');
const Message = require('./models/Message');

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// expose io to REST controllers for emitting realtime events
app.locals.io = io;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// REST routes
app.use('/api', conversationRoutes);

// Socket.io real‑time logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a conversation room
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined room ${conversationId}`);
  });

  // Handle new message
  socket.on('send_message', async (data) => {
    const { conversationId, senderId, content } = data;

    // Save to database
    const message = new Message({ conversationId, senderId, content });
    await message.save();

    // Broadcast to everyone in that conversation room (including sender)
    io.to(conversationId).emit('receive_message', {
      _id: message._id,
      conversationId,
      senderId,
      content,
      createdAt: message.createdAt
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));