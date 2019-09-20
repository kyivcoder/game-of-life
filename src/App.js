import React from 'react';
import './App.css';

import GameOfLife from './containers/GameOfLife/GameOfLife';

function App() {
  return (
    <div className="App">
      <GameOfLife rows={50} cols={50} speed={400} />
    </div>
  );
}

export default App;
