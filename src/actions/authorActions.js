import dispatcher from '../appDispatcher';
import actionTypes from './actionTypes';
import * as authorApi from '../api/authorApi';

// these are the actions that will be invoked by react components and sent to the dispatcher

export async function loadAuthors() {
  const _authors = await authorApi.getAuthors();
  // every dispatch needs an 'actionType' property. it is an action type from our constants file
  //  dispatched payload optionally can take other objects to pass along to the dispatcher
  dispatcher.dispatch({
    actionType: actionTypes.LOAD_AUTHORS,
    authors: _authors
  });
}

export async function saveAuthor(author) {
  const _author = await authorApi.saveAuthor(author);
  // every dispatch needs an 'actionType' property. it is an action type from our constants file
  //  dispatched payload optionally can take other objects to pass along to the dispatcher
  dispatcher.dispatch({
    actionType: actionTypes.CREATE_AUTHOR,
    author: _author
  });
}
