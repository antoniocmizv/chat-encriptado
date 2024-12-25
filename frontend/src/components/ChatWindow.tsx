// src/components/ChatWindow.tsx
import React, { useState } from 'react';

interface Message {
    sender: string;
    text: string;
}

interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col flex-grow p-4">
            <div className="flex-grow overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 ${
                            message.sender === 'me' ? 'bg-blue-200 self-end' : 'bg-gray-200'
                        } rounded`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="flex-none flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow border rounded p-2 mr-2"
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
