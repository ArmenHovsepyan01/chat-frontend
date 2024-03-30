import { io } from 'socket.io-client';

const url = import.meta.env.VITE_CHAT_WS;
export const socket = io(url);
