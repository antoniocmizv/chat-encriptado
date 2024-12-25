// src/components/ContactList.tsx
import React from 'react';

interface Contact {
    id: number;
    name: string;
}

interface ContactListProps {
    contacts: Contact[];
    onSelectContact: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onSelectContact }) => {
    return (
        <div className="w-1/4 bg-gray-100 h-full border-r p-4">
            <h2 className="text-xl font-bold mb-4">Contactos</h2>
            <ul>
                {contacts.map((contact) => (
                    <li
                        key={contact.id}
                        onClick={() => onSelectContact(contact.id)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                        {contact.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
