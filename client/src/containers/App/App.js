import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';

import Typography from '@material-ui/core/Typography';

const GET_COUNTRIES = gql`
  query Countries {
    getCountries {
      id
      name
    }
  }
`;

function App() {
  const [countries, setCountries] = useState([{ name: 'lol' }]);
  const { loading, error } = useQuery(GET_COUNTRIES, {
    onCompleted: data => {
      setCountries(data.getCountries);
    }
  });

  console.log(error);
  return (
    <div className='App'>
      {loading && <Typography>Loading</Typography>}
      {countries.map(country => {
        return <Typography>{country.name}</Typography>;
      })}
    </div>
  );
}

export default App;
