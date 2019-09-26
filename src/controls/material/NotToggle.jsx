import PropTypes from 'prop-types';
import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const NotToggle = ({ className, handleOnChange, title, checked }) => (
  <FormControlLabel
    className={className}
    control={<Checkbox value={!!checked} onChange={(e) => handleOnChange(e.target.checked)} />}
    label="Not"
    labelPlacement="start"
  />
);

NotToggle.displayName = 'NotToggle';

NotToggle.propTypes = {
  className: PropTypes.string,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  checked: PropTypes.bool
};

export default NotToggle;
