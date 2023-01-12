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
    <div className="APP">
      <button onClick={ upsertItem }>Upsert Item</button>
      <button onClick={ getItem }>get Item</button>
      <button onClick={ deleteItem }>delete Item</button>
    </div>
  );
}

export default App;
