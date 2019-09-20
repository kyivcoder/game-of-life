import React from 'react';

import classes from './Grid.module.sass';

function Grid(props) {
  return (
    <div className={classes.Grid}>
      {props.gridData.map(
        (cols, rowIndex) =>
          cols.map((col, colIndex) => props.render(col, rowIndex, colIndex)) // Custom col
      )}
    </div>
  );
}

export default Grid;
