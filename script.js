let todos = [];

function goToAddPage() {
    window.location.href = "add.html";
}

function deleteTodoItem(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodoItems();
}

function editTodoItem(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        localStorage.setItem("editTodo", JSON.stringify(todo));
        window.location.href = "edit.html";
    }
}

function submitTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    todos.push({ id, title, description });
    displayTodoItems();

    window.location.href = "index.html";
}

function submitEditedTodo() {
    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;

    todos = todos.map(todo => {
        if (todo.id == id) {
            todo.title = title;
            todo.description = description;
        }
        return todo;
    });
    localStorage.removeItem("editTodo");
    displayTodoItems();

    window.location.href = "index.html";
}

function displayTodoItems() {
    const todoListDiv = document.getElementById("todoList");
    todoListDiv.innerHTML = ""; 

    todos.forEach(todo => {
        const todoItemDiv = document.createElement("div");
        todoItemDiv.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <button onclick="editTodoItem(${todo.id})">Edit</button>
            <button onclick="deleteTodoItem(${todo.id})">Delete</button>
        `;
        todoListDiv.appendChild(todoItemDiv);
    });
}

// Check if there's an item in localStorage for editing
document.addEventListener("DOMContentLoaded", function() {
    const editTodo = JSON.parse(localStorage.getItem("editTodo"));
    if (editTodo) {
        document.getElementById("editId").value = editTodo.id;
        document.getElementById("editTitle").value = editTodo.title;
        document.getElementById("editDescription").value = editTodo.description;
    }
    displayTodoItems();
});