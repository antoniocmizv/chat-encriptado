// src/pages/ChatPage.tsx
import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ChatWindow from '../components/ChatWindow';
import api from '../utils/api';

const ChatPage: React.FC = () => {
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [activeChat, setActiveChat] = useState<number | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get('/users');
                setContacts(response.data);
            } catch (error) {
                console.error('Error al cargar los contactos:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleSelectContact = (id: number) => {
        setActiveChat(id);
        setMessages([]);
    };

    const handleSendMessage = (message: string) => {
        setMessages([...messages, { sender: 'me', text: message }]);
    };

    return (
        <div className="flex h-screen">
            <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
            {activeChat ? (
                <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500">Selecciona un contacto para comenzar a chatear</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
