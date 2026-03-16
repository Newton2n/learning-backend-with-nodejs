import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems}) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          todoDate={item.created}
          todoName={item.task}
          id={item.id}
          
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoItems;
