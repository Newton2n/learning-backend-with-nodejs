import { useState } from "react";

import "./App.css";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [jokes, setJokes] = useState([]);
  
  useEffect(() => {
    axios
      .get("api/jokes")
      .then((response) => {
        setJokes(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <>
      <h1>back end connect </h1>
      <h3>JOKES :{jokes.length}</h3>

      {jokes.map((joke) => {
      return ( <div key={joke.id}>
          <h3>{joke.title}</h3>
          <h3>{joke.content}</h3>
        </div>)
      })}
    </>
  );
}

export default App;
