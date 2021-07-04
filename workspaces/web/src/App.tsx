import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApolloClient } from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import ApolloComponent from './ApolloComponent';

const App = () => {

  const client = getApolloClient();
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <ApolloComponent/>
        </header>
      </ApolloProvider>
    </div>
  );
}

export default App;
