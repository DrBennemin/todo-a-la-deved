// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Variables
let todos = JSON.parse(localStorage.getItem("todos"));

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(filter) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    const selected = todo.classList.contains("completed");
    switch (filter.target.value) {
      case "all":
        displayItem("flex", todo);
        break;
      case "completed":
        displayItem(selected ? "flex" : "none", todo);
        break;
      case "uncompleted":
        displayItem(!selected ? "flex" : "none", todo);
    }
  });
}

function displayItem(attributeValue, todo) {
  todo.style.display = attributeValue;
}

function saveLocalTodos(todo) {
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function getTodos() {
  if (localStorage.getItem("todos") !== null) {
    todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("completed-btn");
      todoDiv.appendChild(completedButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add("delete-btn");
      todoDiv.appendChild(deleteButton);

      todoList.appendChild(todoDiv);
    });
  }
}

function removeLocalTodos(todo) {
  if (localStorage.getItem("todos") !== null) {
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
