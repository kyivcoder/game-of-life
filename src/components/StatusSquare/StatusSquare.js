import React from 'react';
import classes from './StatusSquare.module.sass';

function StatusSquare(props) {
  return (
    <div
      className={`${classes.StatusSquare} ${
        props.isOK ? classes.OK : classes.NotOK
      }`}
    ></div>
  );
}

export default StatusSquare;
