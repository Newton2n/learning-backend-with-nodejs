export async function createTodo(task, date) {
  const response = await fetch("http://localhost:3004/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  return response.json();
}

export async function getAllTodo() {
  const response = await fetch("http://localhost:3004/api/todo");
  const items = await response.json();
  console.log("item fetch in service", items);
  return items.map(mapServerItem);
}
export async function deleteItem(id) {
  const response = await fetch(`http://localhost:3004/api/todo/${id}`, {
    method: "DELETE",
  });
  return "";
}

const mapServerItem = (item) => {
  return {
    id: item._id,
    task: item.task,
    created: item.date,
    status: item.completed,
  };
};
