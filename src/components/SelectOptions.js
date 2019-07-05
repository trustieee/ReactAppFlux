import React from 'react';
import PropTypes from 'prop-types';

/*
    <option value="" />
    <option value="1">Foo</option>
    <option value="2">Bar</option>
*/

function SelectOptions(props) {
  return (
    <>
      {props.useDefault && <option value="" key="0" />}
      {props.options.map(function(o) {
        return (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        );
      })}
    </>
  );
}

SelectOptions.propTypes = {
  useDefault: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  )
};

export default SelectOptions;
