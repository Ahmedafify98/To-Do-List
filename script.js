// Shared To-Do List Logic for Daily, Monthly, Yearly

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const todoKey = window.todoKey || 'todos-daily';

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem(todoKey) || '[]');
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    addTodoToDOM(todo.text, todo.done, idx);
  });
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll('.todo-item').forEach(li => {
    const text = li.querySelector('.todo-text').textContent;
    const done = li.querySelector('.todo-checkbox').checked;
    todos.push({ text, done });
  });
  localStorage.setItem(todoKey, JSON.stringify(todos));
}

function addTodoToDOM(text, done = false, idx = null) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const left = document.createElement('div');
  left.className = 'todo-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = done;
  checkbox.addEventListener('change', () => {
    span.classList.toggle('done', checkbox.checked);
    saveTodos();
  });

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;
  if (done) span.classList.add('done');

  left.appendChild(checkbox);
  left.appendChild(span);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = '✖';
  removeBtn.onclick = () => {
    li.remove();
    saveTodos();
  };

  li.appendChild(left);
  li.appendChild(removeBtn);
  list.appendChild(li);
}

function addTodo() {
  const text = input.value.trim();
  if (text === '') return;
  addTodoToDOM(text, false);
  saveTodos();
  input.value = '';
  input.focus();
}

// Add with button click
addBtn.addEventListener('click', addTodo);

// Add with Enter key
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTodo();
});

// Initial load
window.addEventListener('DOMContentLoaded', loadTodos);