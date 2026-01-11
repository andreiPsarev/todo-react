function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label className="checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark"></span>
      </label>

      <span className={todo.completed ? "completed" : ""}>
        {todo.text}
      </span>

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ✖
      </button>
    </li>
  );
}

export default TodoItem;
