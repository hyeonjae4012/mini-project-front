import './App.css';
import axios from 'axios';

function App() {

  const base_url = "https://2qop51h7h7.execute-api.ap-northeast-1.amazonaws.com/prod"
  const createItem = () => {
    console.log("createItem");
    axios.post(`${base_url}/test`, {
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
