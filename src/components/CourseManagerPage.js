/*
  don't need to call api directly anymore, because the store
    has the data we need 
*/

import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';
import { toast } from 'react-toastify';

function CourseManager(props) {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(
    function() {
      courseStore.addChangeListener(onChange);
      authorStore.addChangeListener(onChangeAuthors);

      // pulled from url /courses/:slug
      const slug = props.match.params.slug;
      if (courses.length === 0) courseActions.loadCourses();
      if (authors.length === 0) authorActions.loadAuthors();
      else if (slug) {
        const slugCourse = courseStore.getCourseBySlug(slug);
        if (!slugCourse) {
          props.history.push('/course-not-found/:' + slug);
        }
        setCourse(slugCourse);
      }

      function onChange(callback) {
        setCourses(courseStore.getCourses());
      }

      function onChangeAuthors(callback) {
        setAuthors(authorStore.getAuthors());
      }

      return function() {
        courseStore.removeChangeListener(onChange);
        authorStore.removeChangeListener(onChangeAuthors);
      };
    },
    [authors.length, courses.length, props.history, props.match.params.slug]
  );

  // the {target} destructuring syntax will create a const variable
  //  in the function that points at the 'target' property of the passed in
  //  event argument.
  //
  // event.target.foo - we're targeting the 'target' by doing {target}
  function handleChange(event) {
    // don't do this, keep the state immutable
    //course.title = event.target.title;

    // [target.name] is a computed property
    //  it sets a property on the object based on the value of a variable
    //setCourse({ ...course, [target.name]: target.value });

    setCourse({
      ...Object.assign({}, course),
      [event.target.name]: event.target.value
    });

    //setCourse();
  }

  function formIsValid() {
    // prefix with _, avoids name collision with state property
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Author ID is required';
    if (!course.category) _errors.category = 'Category is required';

    setErrors(_errors);
    // form is valid if _errors has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    courseActions.saveCourse(course).then(function() {
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        authors={authors}
      />
    </>
  );
}

export default CourseManager;
