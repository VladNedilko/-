import React from 'react';

function ContactList() {
  const contacts = [
    { name: 'Анна', phone: '098-123-4567' },
    { name: 'Богдан', phone: '063-987-6543' },
    { name: 'Катерина', phone: '050-456-7890' }
  ];

  return (
    <div>
      <h3>Список контактів</h3>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name}: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
