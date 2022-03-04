import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';
import {useState, useEffect} from 'react';
import Calendar from './components/Calendar';

function App() {

  // makes a pop up with connect as text
  // const connect = () => {
  //   alert('connect');
  // }

  const [account, setAccount] = useState(false);

  useEffect(() => {
    isConnected();
  }, []);

  const isConnected = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No authorized account found")
    }
  }

  const connect = async () => {
    try {
      const provider = await detectEthereumProvider();
      
      // returns an array of accounts
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      
      // check if array at least one element
      if (accounts.length > 0) {
        console.log('account found', accounts);
        setAccount(accounts[0]);
      } else {
        console.log('No account found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>calend3.eth</h1>
        <div id = "slogan"> web3 appointment scheduling</div>
        {!account && <button onClick={connect}>connect wallet</button>}
        {account && <Calendar account={account} />}
      </header>
    </div>
  );
}

export default App;
