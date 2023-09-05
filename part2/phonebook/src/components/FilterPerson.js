import React from 'react';

const FilterPerson = (props) => {
  return (
    <form>
      limit what can be displayed
      <input value={props.newSearch} onChange={props.handleSearchChange} />
      <br />
    </form>
  );
};

export default FilterPerson;
