import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import PropTypes from 'prop-types';

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        onChange={props.onChange}
        value={props.course.authorId ? props.course.authorId.toString() : ''}
        error={props.errors.authorId}
        options={props.authors.map(function(a) {
          return {
            value: a.id,
            label: a.name
          };
        })}
        useDefault={true}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

CourseForm.defaultProps = {
  authors: [
    {
      id: 0,
      name: ''
    }
  ]
};

export default CourseForm;
