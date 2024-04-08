import React, { useEffect, useState } from 'react';
import axios from "axios";
const App = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios.get("/api/jokes").then((response) => {
      setJokes(response.data)
    }).catch((error) => {
      console.log(error)
    })
  })

  return (
    <>
      <h1>Full stack App</h1>
      <p>jokes:{jokes.length}</p>
      {jokes.map((joke, index) => {
        return (
          <>
            <div key={joke.id}>
              <h3>{joke.title}</h3>
              <p>{joke.content}</p>
            </div>
          </>
        )

      })}
    </>
  )
}

export default App