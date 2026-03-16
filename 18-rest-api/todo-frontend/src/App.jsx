import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState } from "react";
import { createTodo, getAllTodo,deleteItem } from "./service/todoItem";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const fetchAll = async () => {
    const res = await getAllTodo();
    console.log(res);
    setTodoItems(res);
  };
  // fetchAll()
  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    createTodo(itemName, itemDueDate);
    // const newTodoItems = [
    //   ...todoItems,
    //   { name: itemName, dueDate: itemDueDate },
    // ];
    fetchAll();
    // setTodoItems(newTodoItems);
  };

  const handleDeleteItem =async (todoItemId) => {
   await deleteItem(todoItemId)
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
      ></TodoItems>
    </center>
  );
}

export default App;
