import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      console.log("before")
      console.log(todos.data);
      setTodos(todos.data);
      console.log(todos);
      console.log("after")
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async e => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    // if (todos.some(({ task }) => task === todo)) {
    //   alert(`Task: ${todo} already exists`);
    //   return;
    // }
    const newTodo = await APIHelper.createTodo(todo);
    console.log(newTodo);
    console.log(todos);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {completed: !todos.find(todo => todo._id === id).completed}
    console.log("payload: " + payload)
    const updatedTodo  = await APIHelper.updateTodo(id, payload)
    console.log("updateTodo: " + updateTodo)
    setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
    
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          placeholder="Enter a todo"
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>

      <div className="todo">
        {todos.length ? todos.map(({ _id, task, completed }, i) => (
          <p
            key={i}
            onClick={e => updateTodo(e, _id)}
            className={completed ? "completed" : ""}
          >
            {task} 
              <span className="todo-span" onClick={e => deleteTodo(e, _id)}>DELETE</span>
          </p>
        )): <p>No Todos Yet :(</p>}
      </div>
    </div>
  );
}

export default App;