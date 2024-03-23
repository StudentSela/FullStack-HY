import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';

// Comment
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '+3589534053', id: 1 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(phonebookPersons => {
        setPersons(phonebookPersons);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if (personExists) {
      setNotification(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification(`Added ${newName}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }); 
    } 
  }; 

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification(`Deleted ${person.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} />
  </div>
);

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addName}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>
);

const Person = ({ person, onDelete }) => (
  <li className="person-item">
    {person.name} {person.number}
    <button onClick={onDelete}>delete</button>
  </li>
);

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map(person =>
      <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />
    )}
  </ul>
);

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="notification">
      {message}
    </div>
  );
}

export default App;