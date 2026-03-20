import TodoItem from "./iodo-item";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems,handleDeleteItem}) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          todoDate={item.created}
          todoName={item.task}
          id={item.id}
          handleDeleteItem ={handleDeleteItem}
          
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoItems;
