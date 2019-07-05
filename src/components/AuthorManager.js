import React, { useState, useEffect } from 'react';
import authorStore from '../stores/authorStore';
import AuthorForm from './AuthorForm';
import { toast } from 'react-toastify';
import * as authorActions from '../actions/authorActions';

function AuthorManager(props) {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: 0,
    name: ''
  });

  useEffect(function() {
    // mount
    // register for author store payloads
    authorStore.addChangeListener(onAuthorStoreChange);

    // unmount
    return function() {
      authorStore.removeChangeListener(onAuthorStoreChange);
    };

    // handle authore store payloads
    function onAuthorStoreChange() {
      console.log('author manager received payload from author store');
      setAuthors(authorStore.getAuthors());
    }
  });

  function handleChange(event) {
    setAuthor({
      ...Object.assign({}, author),
      [event.target.name]: event.target.value
    });
  }

  function formIsValid() {
    // prefix with _, avoids name collision with state property
    const _errors = {};

    if (!author.name) _errors.name = 'Name is required';

    setErrors(_errors);
    // form is valid if _errors has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    authorActions.saveAuthor(author).then(function() {
      props.history.push('/courses');
      toast.success('Author saved.');
    });
  }

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        errors={errors}
        author={author}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AuthorManager;
