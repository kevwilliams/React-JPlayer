import React from 'react';
import { Container, Input } from 'semantic-ui-react';

const Search = ({ value, onChange, children }) =>
  <div>
  	<Container>
        {children} 
        <Input
        	focus 
        	placeholder="Search..." 
        	icon='search'
        	onChange={onChange}
    	/>
      </Container>	
  </div>

export default Search;