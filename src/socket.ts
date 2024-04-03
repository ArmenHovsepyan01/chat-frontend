import { io } from 'socket.io-client';

const url = import.meta.env.VITE_CHAT_WS;
const socket = io(url);

socket.on('connection', (socket) => {
  console.log(socket.id, 'connected');
});

export default socket;
