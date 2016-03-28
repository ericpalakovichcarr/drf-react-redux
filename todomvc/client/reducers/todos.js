import { GET_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO } from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {

  case GET_TODOS:
    return [...action.todos];

  case ADD_TODO:
    return [...state, action.todo];

  case DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo.id === action.todo.id ? action.todo : todo
    );

  /* Not importatnt to implement these for the talk 
  case MARK_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        { ...todo, marked: !todo.marked } :
        todo
    );

  case MARK_ALL:
    const areAllMarked = state.every(todo => todo.marked);
    return state.map(todo => ({
      ...todo,
      marked: !areAllMarked
    }));

  case CLEAR_MARKED:
    return state.filter(todo => todo.marked === false);
  */

  default:
    return state;
  }
}
