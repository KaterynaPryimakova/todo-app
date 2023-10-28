const input = document.querySelector('.input-js');
const btnAdd = document.querySelector('.btn-add');
const todoList = document.querySelector('.todo-list');

const LS_KEY = 'todo';
const todoArr = JSON.parse(localStorage.getItem(LS_KEY)) ?? [];

btnAdd.addEventListener('click', todo);
todoList.addEventListener('click', onListClick);
todoList.addEventListener('click', onDelClick);

if (todoArr.length) {
  const todosMarkup = todoArr.map(createMarkup).join('');

  todoList.insertAdjacentHTML('beforeend', todosMarkup);
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
  return `<li id="${id}" class="${status}">
  <p>${text}</p>
  <button type="button" class="${toggleStatus}"></button>
  </li>`;
}

function onListClick(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  if (event.target.classList.contains('todo')) {
    event.target.classList.remove('todo');
    event.target.classList.add('complete');
    event.target.lastElementChild.classList.remove('btn-update');
    event.target.lastElementChild.classList.add('btn-delete');
  } else {
    event.target.classList.remove('complete');
    event.target.classList.add('todo');
    event.target.lastElementChild.classList.remove('btn-delete');
    event.target.lastElementChild.classList.add('btn-update');
  }
  changeLSStatus(event.target);
}

function changeLSStatus(currentEl) {
  const dataLS = JSON.parse(localStorage.getItem(LS_KEY));
  const changeArr = dataLS.map(obj => {
    if (obj.id === Number(currentEl.id)) {
      obj.status = currentEl.classList[0];
    }
    return obj;
  });

  localStorage.setItem(LS_KEY, JSON.stringify(changeArr));
}

function onDelClick(event) {
  if (!event.target.classList.contains('btn-delete')) {
    return;
  }
  const dataLS = JSON.parse(localStorage.getItem(LS_KEY));
  const newArr = dataLS.filter(
    item => event.target.closest('li').id !== item.id
  );
  console.log(newArr);
  event.target.closest('li').remove();
  localStorage.setItem(LS_KEY, JSON.stringify(newArr));
}
