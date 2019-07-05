import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

// action creator
export async function saveCourse(course) {
  const _course = await courseApi.saveCourse(course);

  // this is the action being dispatched by this action creator
  //  'go tell all the stores that a course was just created'
  dispatcher.dispatch({
    actionType: course.id
      ? actionTypes.UPDATE_COURSE
      : actionTypes.CREATE_COURSE,
    course: _course
  });
}

export async function loadCourses() {
  const _courses = await courseApi.getCourses();

  dispatcher.dispatch({
    actionType: actionTypes.LOAD_COURSES,
    courses: _courses
  });
}

export async function deleteCourse(id) {
  await courseApi.deleteCourse(id);

  dispatcher.dispatch({
    actionType: actionTypes.DELETE_COURSE,
    id: id
  });
}
