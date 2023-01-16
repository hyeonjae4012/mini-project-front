import './App.css';
import axios from 'axios';

function App() {

  const createItem = () => {
    console.log("createItem");
    axios.post(`/prod/test`, {
      TestPartitionKey: "test"
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
    axios.put(`/prod/test`, {
      TestPartitionKey: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getItem = () => {
    console.log("getItem");
    axios.get(`/prod/test`, {
      TestPartitionKey: "test"
    })
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const deleteItem = () => {
    console.log("deleteItem");
    axios.delete(`/prod/test`, {
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
