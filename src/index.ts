import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();
const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

const client = new MongoClient(uri);


const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Cambia según tu frontend
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Autenticación
app.post('/auth/register', (req, res) => {
    // Lógica de registro
    res.json({ message: 'Usuario registrado' });
});

app.post('/auth/login', (req, res) => {
    // Lógica de inicio de sesión
    res.json({ token: 'fake-jwt-token' });
});

// Usuarios

// Devuelve una lista de usuarios obtenida de la base de datos


app.get('/users', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('chatter');
        const usersCollection = database.collection('usuarios');
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    } finally {
        await client.close();
    }
});


// Mensajes
app.post('/messages', (req, res) => {
    // Lógica para enviar un mensaje
    res.json({ message: 'Mensaje enviado' });
});

app.get('/messages/:chatId', (req, res) => {
    // Lógica para obtener mensajes de un chat específico
    res.json([{ sender: 1, text: 'Hola' }]);
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
server.listen(3001, () => console.log('Servidor WebSocket escuchando en el puerto 3001'));
