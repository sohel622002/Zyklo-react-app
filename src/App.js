import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Zyklo from './Container/zyklo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* temp commit*/}
        <Zyklo />
      </BrowserRouter>
    </div>
  );
}

export default App;
