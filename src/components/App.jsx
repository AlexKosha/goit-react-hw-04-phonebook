import { useEffect, useState } from 'react';
import shortid from 'shortid';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      const contactsLS = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contactsLS);
      if (parsedContacts) {
        mountContacts(parsedContacts);
      }
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const mountContacts = parsedContacts => {
    if (parsedContacts.length !== 0) {
      setContacts(parsedContacts);
    }
  };

  const addContact = (name, number) => {
    if (checkContactExist(name)) {
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );

    const updateContacts = contacts.filter(contact => contact.id !== contactId);

    localStorage.setItem('contacts', JSON.stringify(updateContacts));
  };

  const getVisibleTodos = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const checkContactExist = newName => {
    const isNameDublicate = contacts.some(contact => contact.name === newName);

    if (isNameDublicate) {
      alert(`${newName} is alredy in contacts`);
      return true;
    }
  };

  const visibleTodos = getVisibleTodos();

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter}></Filter>
        <ContactsList
          contacts={visibleTodos}
          onDeleteContact={deleteContact}
        ></ContactsList>
      </Section>
    </div>
  );
}
