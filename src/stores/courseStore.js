/*
    this is a full boilerplate of what a flux store looks like
    it can be refactored so it's not repeated throughout each store

    redux avoids some of this configuration code
*/

import { EventEmitter } from 'events'; // this is from node
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';

// course store is going to store course data
// is effectively private because it's not exported
let _courses = [];

// extend node's event emitter
//  on: adds listener to array of listeners
//  remove: removes a listener from array of listeners
//  emit: calls each registered listener
//
// 3 functions in every flux store
//  addChangeListener - wraps on
//  removeChangeListener - wraps removeListener
//  emitChange - wraps emit
//
// this class utilizes node's built-in event emit functionality
//  this class exists because our react components only need these 3 functions
class CourseStore extends EventEmitter {
  // store needs to emit events each time a change occurs

  // allows react components to subscribe to store
  //  so they're notified when changes occur in this store
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // allows react components to unsubscribe from the store
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  // allows the store to notify each registered listener
  emitChange(callback) {
    this.emit(CHANGE_EVENT, callback);
  }

  // handy function that returns a portion of a flux store
  //  could add sorting functions/etc
  getCourses() {
    return _courses;
  }

  // handy function that returns a portion of a flux store
  //  could add sorting functions/etc
  getCourseBySlug(slug) {
    return _courses.find(c => c.slug === slug);
  }
}

const store = new CourseStore();

// accepts function that takes an action
//  the function gets called anytimes an action gets dispatched
//  this means every store that registers to this dispatcher will
//  be notified of any action that gets dispatched through the
//  singleton dispatcher
// so we need to make sure we respond to the correct action type
dispatcher.register(function(action) {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);

      // anytime the store changes, we must call emitChange()
      //  by emiting a change, any react components registered with this store
      //  wil be notified
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;

      // store has updated with new courses
      //  emit the change out to all listeners
      store.emitChange();
      break;

    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
      break;

    // if you wanted a progress spinner, you could
    //  fire off a delete course action then a
    //  deleted course action once the deletion is complete
    case actionTypes.DELETE_COURSE:
      // remove any courses that have an id matching
      //  the id from the action payload (effectively, the deleted course)
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );

      store.emitChange();
      break;
    default: // do nothing
  }
});

export default store;
