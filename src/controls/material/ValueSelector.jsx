import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 80
    }
  }),
  { name: 'ValueSelector' }
);

const ValueSelector = ({ className, handleOnChange, options, title, value }) => {
  const classes = useStyles();
  return (
    <TextField
      select
      label={title}
      className={clsx(classes.textField, className)}
      onChange={(e) => handleOnChange(e.target.value)}
      value={value}>
      {options.map((option) => {
        const key = option.id ? `key-${option.id}` : `key-${option.name}`;
        return (
          <MenuItem key={key} value={option.name}>
            {option.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

ValueSelector.displayName = 'ValueSelector';

ValueSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  handleOnChange: PropTypes.func,
  title: PropTypes.string
};

export default ValueSelector;
