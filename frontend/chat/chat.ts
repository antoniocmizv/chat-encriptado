import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
    console.log('Conectado al servidor WebSocket');
});

// Enviar mensaje
const sendMessage = (message: string) => {
    socket.emit('sendMessage', { text: message });
};

// Recibir mensaje
socket.on('receiveMessage', (data) => {
    console.log('Mensaje recibido:', data);
});
