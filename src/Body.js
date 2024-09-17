import React from 'react';
import InteractiveForm from './InteractiveForm';
import TaskList from './TaskList';
import Quote from './Quote';
import RandomImage from './RandomImage';
import ContactList from './ContactList';

function Body() {
  return (
    <main style={bodyStyle}>
      <section id="tasks">
        <TaskList />
      </section>
      
      <section id="quote" style={sectionStyle}>
        <Quote />
      </section>

      <section id="form" style={sectionStyle}>
        <InteractiveForm />
      </section>

      <section id="image" style={sectionStyle}>
        <RandomImage />
      </section>

      <section id="contacts" style={sectionStyle}>
        <ContactList />
      </section>
    </main>
  );
}

const bodyStyle = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  minHeight: '400px',
};

const sectionStyle = {
  margin: '20px 0',
};

export default Body;
