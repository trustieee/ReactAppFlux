import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  // empty [] as second parameter to useEffect to specify that
  //    we only want a refresh to occur when the component mounts
  useEffect(function() {
    // the callback function is called when the store changes (for ANY reason)
    courseStore.addChangeListener(onCourseStoreChange);
    authorStore.addChangeListener(onAuthorStoreChange);

    // if the course store is empty then call loadCourses()
    if (courseStore.getCourses().length === 0) courseActions.loadCourses();
    if (authorStore.getAuthors().length === 0) authorActions.loadAuthors();

    // unmount logic is executed in a returned function
    //  from useEffect
    // everything else in useEffect is effecitvely run onmount
    return function() {
      courseStore.removeChangeListener(onCourseStoreChange);
      authorStore.removeChangeListener(onAuthorStoreChange);
    };

    function onCourseStoreChange(callback) {
      setCourses(courseStore.getCourses());
    }

    function onAuthorStoreChange(callback) {
      setAuthors(authorStore.getAuthors());
    }
  }, []);

  // fragment around jsx because we have adjacent elements
  //  map returns new array, foreach course return a <tr>
  //  arrow function used instead of anonymous function
  //      less code
  //      no "this" binding issue with arrow functions
  //      arrow will reference the component instance and
  //      anonymous funcitons' 'this' reference the context of the anonymous function
  return (
    <>
      <h2>Courses</h2>
      <Link
        className="btn btn-primary"
        to={{
          pathname: '/course'
        }}
      >
        Add Course
      </Link>
      <Link
        style={{ marginLeft: 1 + 'em' }}
        className="btn btn-secondary"
        to={{
          pathname: '/author'
        }}
      >
        Add Author
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={courseActions.deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
