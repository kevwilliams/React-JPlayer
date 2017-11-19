import React from 'react';

const Search = ({ value, onChange, children }) =>
  <div style={{ padding:'10px'}}>
    <form>
        {children} <input 
          type="text"
          style={{ width:'80%'}}
          value={value}
          onChange={onChange}
        />
      </form>
  </div>

export default Search;