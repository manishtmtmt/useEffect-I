import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [pageNo, setPageNo] = useState(1);

  const saveInfo = () => {
    fetch(`http://localhost:8080/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value: newTodo,
        isCompleted: false,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        setTodos([...todos, d]);
        setNewTodo("");
      });
  };
  useEffect(() => {
    fetch(`http://localhost:8080/posts?_page=${pageNo}&_limit=4`)
      .then((r) => r.json())
      .then((d) => {
        setTodos(d);
      });
  }, [pageNo]);

  return (
    <div>
      Todo
      <div>
        <input
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
        />
        <button onClick={saveInfo}>Save</button>
      </div>
      {todos.map((data) => (
        <div key={data.id}>{data.value}</div>
      ))}
      <button
        onClick={() => {
          if (pageNo > 1) {
            setPageNo(pageNo - 1);
          }
        }}
      >
        {"<"}
      </button>{" "}
      {pageNo} <button onClick={() => setPageNo(pageNo + 1)}>{">"}</button>
    </div>
  );
};

export default Todo;
