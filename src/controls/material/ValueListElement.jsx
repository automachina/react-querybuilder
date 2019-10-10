import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Chip,
  Popover,
  TextField,
  FormControl,
  FormLabel,
  ClickAwayListener
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { map, without } from 'lodash';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      justifyContent: 'start',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      minWidth: '155px',
      minHeight: '30px',
      verticalAlign: 'bottom',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      '&:hover': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.87)'
      }
    },
    addIcon: {
      alignSelf: 'center'
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    textField: {
      minWidth: '50px',
      margin: theme.spacing(1)
    }
  }),
  { name: 'ValueList' }
);

const ValueList = ({
  value,
  onChange,
  title,
  className,
  inputType,
  values,
  textFieldProps = {}
}) => {
  if (typeof value === 'string') {
    if (value.trim() === '') onChange([]);
    else onChange([value]);
    return <i />;
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addValue, setAddValue] = React.useState('');
  const handleDelete = (item) => {
    const updated = without(value, item);
    onChange(updated);
  };

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleAcceptValue = (e) => {
    if (e.key !== 'Enter') return;
    const updated = Array.isArray(value) ? [...value, e.target.value] : [e.target.value];
    onChange(updated);
    setAddValue('');
    handleClose();
  };

  return (
    <Box className={clsx(classes.root, className)} onClick={handleClick}>
      <AddIcon fontSize="small" className={classes.addIcon} />
      {map(value, (item, idx) => (
        <Chip
          variant="outlined"
          key={`key-${idx}_${item}`}
          label={item}
          size="small"
          onDelete={() => handleDelete(item)}
          className={clsx(classes.chip)}
        />
      ))}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        className={clsx(classes.popover)}>
        <ClickAwayListener onClickAway={handleClose}>
          <TextField
            autoFocus
            type={inputType}
            value={addValue}
            onChange={(e) => {
              setAddValue(e.currentTarget.value);
              e.stopPropagation();
            }}
            onKeyPress={handleAcceptValue}
            label="Add Value"
            className={clsx(classes.textField)}
            {...textFieldProps}
          />
        </ClickAwayListener>
      </Popover>
    </Box>
  );
};

ValueList.displayName = 'ValueList';

ValueList.propTypes = {
  field: PropTypes.string,
  value: PropTypes.any,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  inputType: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object)
};

export default ValueList;
