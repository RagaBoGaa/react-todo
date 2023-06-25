/* eslint-disable react/prop-types */
import checkIcon from "../assets/icon-check.svg";
import crossIcon from "../assets/icon-cross.svg";

const Todo = ({ todo, todoList, setTodoList }) => {
  // To mark the task as completed and vice versa
  const handleCheck = (id) => {
    return setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // To remove the task from the list
  const handleDelete = (id) => {
    return setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="todo__container">
        <div className={todo.isCompleted ? `circle active` : "circle"}>
          <img src={checkIcon} alt="check icon" />
        </div>
        <li
          className={todo.isCompleted ? "active" : ""}
          onClick={() => handleCheck(todo.id)}
        >
          {todo.task}
        </li>

        <img
          src={crossIcon}
          alt="cross icon"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
    </>
  );
};
export default Todo;
