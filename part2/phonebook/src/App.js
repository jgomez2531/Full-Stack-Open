import React, { useState, useEffect } from 'react';
import NewPerson from './components/AddPerson';
import FilterPerson from './components/FilterPerson';
import Persons from './components/Persons';
import personDB from './services/personDB';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleDeletePerson = (name, id) => {
    return () => {
      if (
        window.confirm(`
      Delete ${name} ?`)
      ) {
        personDB
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((n) => n.id !== id));
            setErrorMessage(`Remote ${name}`);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setPersons(persons.filter((n) => n.name !== name));
            setErrorMessage(`User ${name} 
            has already been removed from the server.`);
          });
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    };
  };

  useEffect(() => {
    personDB.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 101),
    };

    if (
      persons.filter((person) => person.name === personObject.name).length > 0
    ) {
      if (
        window.confirm(
          `${personObject.name} 
          is already in the list, will the old number be replaced with a new one?`
        )
      ) {
        const previousPerson = persons.find((n) => n.name === newName);
        personDB
          .update(previousPerson.id, { ...previousPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((n) => (n.name === newName ? updatedPerson : n))
            );
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage('Update failed');
          });
        setPersons(persons.concat(personObject));
        setErrorMessage(`Changed ${personObject.name} number`);
        setNewName('');
        setNewNumber('');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else {
      personDB
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setErrorMessage(`Was added ${personObject.name}`);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          console.log(error.response.data);
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Telephone directory</h2>
      <Notification message={errorMessage} />
      <FilterPerson
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new one</h3>
      <NewPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newSearch={newSearch}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
