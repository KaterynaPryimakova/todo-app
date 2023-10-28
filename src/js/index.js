const input = document.querySelector('.input-js');
const btnAdd = document.querySelector('.btn-add');
const todoList = document.querySelector('.todo-list');

const LS_KEY = 'todo';
const todoArr = JSON.parse(localStorage.getItem(LS_KEY) ?? []);
btnAdd.addEventListener('click', todo);
todoList.addEventListener('click', onListClick);

if (todoArr.length) {
}

function todo() {
  if (!input.value.trim()) {
    return;
  }
  const object = {
    id: Date.now(),
    status: 'todo',
    text: input.value,
  };
  todoList.insertAdjacentHTML('beforeend', createMarkup(object));
  todoArr.push(object);
  localStorage.setItem(LS_KEY, JSON.stringify(todoArr));
}

function createMarkup({ id, status, text }) {
  const toggleStatus = status === 'todo' ? 'btn-update' : 'btn-delete';
  return `<li id="${id} class="${status}"></li><p>${text}</p><button type="button" class="${toggleStatus}"></button>`;
}
function onListClick(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  if (event.target.ClassList.contains('todo')) {
    event.target.ClassList.remove('todo');
    event.target.ClassList.add('complete');
    event.target.lastElementChild.ClassList.remove('btn-update');
    event.target.lastElementChild.ClassList.add('btn-delete');
  } else {
    event.target.ClassList.remove('complete');
    event.target.ClassList.add('todo');
    event.target.lastElementChild.ClassList.remove('btn-delete');
    event.target.lastElementChild.ClassList.add('btn-update');
  }
}
