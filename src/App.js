import logo from './logo.svg';
import './App.css';

function App() {

  const upsertItem = () => {
    console.log("upsertItem")
  }

  const getItem = () => {
    console.log("getItem")
  }

  const deleteItem = () => {
    console.log("deleteItem")
  }


  return (
    <div className="TEST">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudfront Test
        </a>
      </header>
    </div>
  );
}

export default App;
