import AppName from "./components/app-name";
import AddTodo from "./components/add-todo";
import TodoItems from "./components/todo-items";
import WelcomeMessage from "./components/welcome-message";
import "./App.css";
import { useState } from "react";
import { createTodo, getAllTodo, deleteItem } from "./service/todo-item";
import { useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const fetchAll = async () => {
    const res = await getAllTodo();
    console.log(res);
    setTodoItems(res);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    await createTodo(itemName, itemDueDate);

    fetchAll();
  };
  const handleDeleteItem = async (todoItemId) => {
    await deleteItem(todoItemId);
    fetchAll();
    console.log(todoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}

      {todoItems.length > 0 && (
        <TodoItems
          todoItems={todoItems}
          handleDeleteItem={handleDeleteItem}
        ></TodoItems>
      )}
    </center>
  );
}

export default App;
