import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    unSelected: {
      opacity: 0.5
    }
  }),
  { name: 'CombinatorSelector' }
);

const CombinatorSelector = ({ className, handleOnChange, options, title, value, rules, level }) => {
  const classes = useStyles();
  const onClick = (item) => (event) => {
    if (value !== item.name) {
      handleOnChange(item.name);
    }
    event.stopPropagation();
  };
  return (
    <ButtonGroup color="primary" variant="contained" size="small">
      {options.map((item) => {
        const key = item.id ? `key-${item.id}` : `key-${item.name}`;
        const unSelected = value !== item.name ? classes.unSelected : null;
        return (
          <Button key={key} onClick={onClick(item)} className={clsx(unSelected, className)}>
            {item.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

CombinatorSelector.displayName = 'CombinatorSelector';

CombinatorSelector.propTypes = {
  options: PropTypes.array.isRequired, //same as 'combinators' passed into QueryBuilder
  value: PropTypes.string, //selected combinator from the existing query representation, if any
  className: PropTypes.string, //CSS classNames to be applied
  handleOnChange: PropTypes.func, //callback function to update query representation
  rules: PropTypes.array, //Provides the number of rules already present for this group
  level: PropTypes.number //The level of the current group
};

export default CombinatorSelector;
