import React from 'react';

const NewPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      by them:
      <input value={props.newName} onChange={props.handleNameChange} />
      <br />
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
      <br />
      <button type="submit">lisää</button>
    </form>
  );
};

export default NewPerson;
