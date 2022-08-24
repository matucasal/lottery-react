import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

function App() {

  const [manager, setManager] = useState([]);

  useEffect(() => {
    const getManager = async () => {
      console.log('lottery.methods', lottery.methods);
      let localManager = await lottery.methods.manager().call();
      setManager(localManager);
    }
    getManager();
  }, []);
  
  return (
    <div>
      <h2>Lottery contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

export default App;
