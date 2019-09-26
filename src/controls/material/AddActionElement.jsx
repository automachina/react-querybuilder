import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    fab: {
      margin: theme.spacing(1)
    },
    fabLabel: {
      marginRight: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  }),
  { name: 'AddAction' }
);

const ActionElement = ({ className, handleOnClick, label, title }) => {
  const classes = useStyles();
  return (
    <Fab
      variant="extended"
      size="small"
      color="primary"
      classes={{ root: clsx(classes.fab, className), label: classes.fabLabel }}
      onClick={(e) => handleOnClick(e)}>
      <AddIcon className={classes.extendedIcon} />
      {label}
    </Fab>
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
