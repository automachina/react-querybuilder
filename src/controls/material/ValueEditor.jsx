import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import {
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup
} from '@material-ui/core';
import ValueList from './ValueListElement';

const ValueEditor = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values
}) => {
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  switch (type) {
    case 'select':
      return (
        <TextField
          select
          label={title}
          className={className}
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}>
          {values.map((v) => (
            <MenuItem key={v.name} value={v.name}>
              {v.label}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'checkbox':
      return (
        <FormControlLabel
          className={className}
          control={<Checkbox checked={value} onChange={(e) => handleOnChange(e.target.checked)} />}
          label={capitalize(value)}
        />
      );

    case 'radio':
      return (
        <FormControl component="fieldset" className={className}>
          <FormLabel component="legend">{title}</FormLabel>
          <RadioGroup value={value} onChange={handleOnChange} row>
            {values.map((v) => (
              <FormControlLabel
                value={v.name}
                label={v.label}
                control={<Radio />}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    default: {
      if (operator === 'in' || operator === 'notIn') {
        return (
          <ValueList
            label={title}
            className={className}
            onChange={handleOnChange}
            value={value}
            inputType={inputType}
          />
        );
      }
      return (
        <TextField
          type={inputType || 'text'}
          label={title}
          className={className}
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}
        />
      );
    }
  }
};

ValueEditor.displayName = 'ValueEditor';

ValueEditor.propTypes = {
  field: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.any,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['select', 'checkbox', 'radio', 'text']),
  inputType: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object)
};

export default ValueEditor;
