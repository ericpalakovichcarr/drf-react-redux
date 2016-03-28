import * as types from '../constants/ActionTypes';

// from: https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function getTodos() {
  return fetch(Urls.todo_list(), {
    credentials: 'same-origin'
  }).then(response => response.json()).then(json => ({
    type: types.GET_TODOS,
    todos: json
  }));
}

export function addTodo(text) {
  const newTodo = {
    text: text,
    marked: false
  };

  return fetch(Urls.todo_list(), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin',
    body: JSON.stringify(newTodo)
  }).then(response => response.json()).then(json => ({
    type: types.ADD_TODO,
    todo: json
  }));
}

export function deleteTodo(id) {
  return fetch(Urls.todo_detail(id), {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin'
  }).then(json => ({
    type: types.DELETE_TODO,
    id: id
  }));
}

export function editTodo(editedTodo) {
  return fetch(Urls.todo_detail(editedTodo.id), {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'same-origin',
    body: JSON.stringify(editedTodo)
  }).then(response => response.json()).then(json => ({
    type: types.EDIT_TODO,
    todo: json
  }));
}

/* Not importatnt to implement these for the talk
export function markTodo(id) {
  return {
    type: types.MARK_TODO,
    id
  };
}

export function markAll() {
  return {
    type: types.MARK_ALL
  };
}

export function clearMarked() {
  return {
    type: types.CLEAR_MARKED
  };
}
*/
