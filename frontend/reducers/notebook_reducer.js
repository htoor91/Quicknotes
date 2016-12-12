import { RECEIVE_NOTEBOOK, RECEIVE_NOTEBOOKS, MAKE_NOTEBOOK, EDIT_NOTEBOOK, REMOVE_NOTEBOOK } from '../actions/note_actions';
import merge from 'lodash/merge';
import { allNotebooks } from './selectors';

const initState = {
  currentNotebook: null,
  allNotebooks: [],
  taggedNotebooks: []
};

const NotebookReducer = (state = initState, action) => {
  let nextState = merge({}, state);
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_NOTEBOOK:
      nextState.currentNotebook = action.fetchedNotebook;
      return nextState;
    case RECEIVE_NOTEBOOKS:
      nextState = merge(nextState, action.allNotebooks);
      nextState.allNotebooks = allNotebooks(action.allNotebooks);
      return nextState;
    case MAKE_NOTEBOOK:
      nextState[action.newNotebook.id] = action.newNotebook;
      return nextState;
    case EDIT_NOTEBOOK:
      nextState[action.editedNotebook.id] = action.editedNotebook;
      return nextState;
    case REMOVE_NOTEBOOK:
      delete nextState[action.deletedNotebook.id];
      return nextState;
    default:
      return state;
  }
};


export default NotebookReducer;
