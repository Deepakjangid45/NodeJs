import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
  // console.log(process.env.REACT_APP_API_URL)

  // const api_url = process.env.REACT_APP_API_URL;
  const api_url = import.meta.env.VITE_API_KEY;

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${api_url}/getalltodos`);
      const data = response.json();
      // console.log(data)

      setTodos(data.todos);

    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async () => {
    try {
      const response = await fetch(`${api_url}/deletetodo/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      alert(data.message)
    } catch (error) {
      console.log(error)
    }
  }


  // Create Todo
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: ""
  });

  const createTodo = async (e) => {
    if (newTodo.title == "") {
      alert("Title is required")
    }
    e.preventDefault();

    try {
      const response = await fetch(`${api_url}/createtodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      // console.log(data.message)
      alert(data.message);
      fetchTodos();

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <h1>Todo App</h1>
      {
        todos.map((todo) => {
          return (
            <div key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>
                {todo.compllete ? "compalted" : "not Compalted"}
              </p>
              <br />
              <br />
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          )
        })
      }

      <br />
      <br />
      <br />

      <h1>create Todo</h1>
      <form action="">
        <input type="text" placeholder='title' onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} />
        <br />
        <input type="text" placeholder='description' onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} />
        <br />
        <button onClick={createTodo}>Create Todo</button>
      </form>


    </>
  )
}

export default App