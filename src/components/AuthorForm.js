import React from 'react';
import TextInput from './TextInput';
import PropTypes from 'prop-types';

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        name="name"
        label="Name"
        value={props.author.name}
        error={props.errors.name}
        onChange={props.onChange}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

AuthorForm.defaultProps = {
  authors: [
    {
      id: 0,
      name: ''
    }
  ]
};

export default AuthorForm;
