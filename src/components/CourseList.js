import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function CourseList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map(function(c) {
          return renderCourseRow(c);
        })}
      </tbody>
    </table>
  );

  function renderCourseRow(course) {
    return (
      <tr key={course.id}>
        <td>
          <Link
            to={{
              pathname: '/course/' + course.slug
            }}
          >
            {course.title}
          </Link>
        </td>
        <td>
          {props.authors.map(function(a) {
            return a.id === course.authorId ? a.name : '';
          })}
        </td>
        <td>{course.category}</td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              props.deleteCourse(course.id);
              toast.success('Course deleted.');
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseList;
