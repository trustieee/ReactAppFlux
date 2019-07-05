import React from 'react';
import PropTypes from 'prop-types';
import SelectOptions from './SelectOptions';

function SelectInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        className="form-control"
        onChange={props.onChange}
      >
        <SelectOptions options={props.options} useDefault={props.useDefault} />
      </select>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  useDefault: PropTypes.bool.isRequired,
  error: PropTypes.string,
  value: PropTypes.string
};

export default SelectInput;
