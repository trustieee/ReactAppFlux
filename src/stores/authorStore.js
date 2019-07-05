import { EventEmitter } from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

// private array of authors in this store
let _authors = [];
const CHANGE_EVENT = 'change';

class AuthorStore extends EventEmitter {
  // on
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  // removeListener
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  // emit
  emitChange(callback) {
    this.emit(CHANGE_EVENT, callback);
  }

  getAuthors() {
    return _authors;
  }
}

const store = new AuthorStore();

// dispatcher hooks
dispatcher.register(function(action) {
  // action will contain the payload from the dispatcher
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      // modify private authors array
      _authors = action.authors;
      // emit event
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
