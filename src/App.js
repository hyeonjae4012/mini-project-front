import './App.css';
import axios from 'axios';

function App() {

  const base_url = "hyeonjae.classmethod.info"

  const createItem = () => {
    console.log("createItem");
    axios.POST(`${base_url}/test`, {
      Key: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const updateItem = () => {
    console.log("updateItem");
    axios.put(`${base_url}/test`, {
      Key: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getItem = () => {
    console.log("upsertItem");
    axios.get(`${base_url}/test`, {
      Key: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const deleteItem = () => {
    console.log("upsertItem");
    axios.delete(`${base_url}/test`, {
      Key: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="APP">
      <button onClick={ createItem }>Create Item</button>
      <button onClick={ updateItem }>Update Item</button>
      <button onClick={ getItem }>get Item</button>
      <button onClick={ deleteItem }>delete Item</button>
    </div>
  );
}

export default App;
