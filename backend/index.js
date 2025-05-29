import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const MY_Server = http.createServer(app);

// ✅ Correct CORS setup for Socket.IO
const io = new Server(MY_Server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

// ✅ Socket connection event
io.on('connection', (socket) => {
  console.log(` Socket connected: ${socket.id}`);


  socket.on('Sent-Message',(data)=>{

    socket.broadcast.emit('Received-Message',data)
    
  })


});

// ✅ Express middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Example test route
app.get('/', (req, res) => {
  res.send('Server with Socket.IO is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
MY_Server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
