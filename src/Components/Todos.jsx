import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

import Header from "./Header";
import Form from "./Form";
import Todo from "./Todo";
import Footer from "./Footer";

// Initial DATA to match the design
const data = [
  { id: "1", task: "Complete online JavsScript course", isCompleted: true },
  { id: "2", task: "Jog around the park 3x", isCompleted: false },
  { id: "3", task: "10 minutes meditation", isCompleted: false },
  { id: "4", task: "Read for 1 hour", isCompleted: false },
  { id: "5", task: "Pick up groceries", isCompleted: false },
  { id: "6", task: "Complete Todo App on Frontend Mentor", isCompleted: false },
];

const Todos = () => {
  const [todoList, setTodoList] = useState(data); // initial todo list
  const [inputTodo, setInputTodo] = useState(""); // control input

  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todoList);

  const uniqueId = uuidv4(); // Get random ids

  useEffect(() => {
    const handleFilter = () => {
      switch (filterStatus) {
        case "active":
          return setFilteredTodos(todoList.filter((todo) => !todo.isCompleted));

        case "completed":
          return setFilteredTodos(todoList.filter((todo) => todo.isCompleted));

        default:
          return setFilteredTodos(todoList);
      }
    };
    handleFilter();
  }, [todoList, filterStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTodo.trim()) return; // Returns if the input field is empty or only contains spaces

    const todoItem = {
      id: uniqueId,
      task: inputTodo,
      isCompleted: false,
    };

    setTodoList((curr) => [...curr, todoItem]);
    setInputTodo("");
  };

  const handleClearCompleted = () => {
    setTodoList((cur) => cur.filter((todo) => !todo.isCompleted));
  };

  // Number of UN COMPLETED TODOS
  const numberNotCompleted = todoList.filter(
    (todo) => !todo.isCompleted
  ).length;

  // Preview Text when there is no tasks
  const textPlacer =
    (filterStatus === "completed" && "completed tasks, finish some!🏁") ||
    (filterStatus === "all" && "tasks, add some!📢") ||
    (filterStatus === "active" && "active tasks, add some!📢");

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = Array.from(todoList);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodoList(reorderedTodos);
  };

  return (
    <main className="todos">
      <Header />
      <Form
        handleSubmit={handleSubmit}
        inputTodo={inputTodo}
        setInputTodo={setInputTodo}
      />

      <div className="todos__container">
        {filteredTodos < 1 ? (
          <p className="info-text">There`s no {textPlacer}</p>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo-list">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Todo
                            key={todo.id}
                            todo={todo}
                            todoList={todoList}
                            setTodoList={setTodoList}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <Footer
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          handleClearCompleted={handleClearCompleted}
          numberNotCompleted={numberNotCompleted}
        />
      </div>
      <p>Drag and drop to re-order list</p>
    </main>
  );
};
export default Todos;
