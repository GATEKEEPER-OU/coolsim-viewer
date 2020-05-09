import React from 'react';
import './styles/tailwind.css';
import logo from './logo.svg';
import Description from "./agent/description.js";






// getLogs();

function App() {


  return (
      <div className="App" style={{margin:20}} >
          <Description/>
      </div>
  );
}

export default App;
