import React from 'react';
import './styles/tailwind.css';
import logo from './logo.svg';
import Description from "./agent/description.js";
import Logs from "./agent/logs.js";





// getLogs();

function App() {


  return (
      <div className="App">
          <Description/>
          <Logs/>
      </div>
  );
}

export default App;
