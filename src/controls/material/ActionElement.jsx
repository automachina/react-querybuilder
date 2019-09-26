import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const ActionElement = ({ className, handleOnClick, label, title }) => (
  <Button variant="outlined" className={className} title={title} onClick={(e) => handleOnClick(e)}>
    {label}
  </Button>
);

ActionElement.displayName = 'ActionElement';

ActionElement.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
  title: PropTypes.string
};

export default ActionElement;
