import { useState } from "react";
import TodoList from "./TodoList";
import "../styles/todo.css";
import { useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);

    setText("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id != id));
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="background"></div>

      <main className="app">
        <div className="switch">
          <h1>TODO</h1>
          <button
            className="switch-theme"
            onClick={toggleTheme}
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            {theme === "light" ? (
              <img
                src="../images/icon-sun.svg"
                alt="Light theme"
                width={24}
                height={24}
              />
            ) : (
              <img
                src="../images/icon-moon.svg"
                alt="Dark theme"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        <div className="card">
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Create a new todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>

        <div className="spacer"></div>

        <div className="card">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <div className="control-panel">
            <p className="items-left">
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </p>

            <div className="filters">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active
              </button>

              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>

        <div className="card filters-mobile">
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>

            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TodoApp;
