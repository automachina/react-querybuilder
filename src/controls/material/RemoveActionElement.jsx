import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    button: {
      verticalAlign: 'bottom'
    }
  }),
  { name: 'RemoveAction' }
);

const ActionElement = ({ className, handleOnClick, label, title }) => {
  const classes = useStyles();
  return (
    <IconButton
      color="secondary"
      className={clsx(classes.button, className)}
      onClick={(e) => handleOnClick(e)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

ActionElement.displayName = 'ActionElement';

ActionElement.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  handleOnClick: PropTypes.func,
  title: PropTypes.string
};

export default ActionElement;
