import React, { Component } from 'react';
import Grid from '../../components/Grid/Grid';
import StatusSquare from '../../components/StatusSquare/StatusSquare';
import { arrayClone } from '../../shared/utility';
import classes from './GameOfLife.module.sass';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: Array(this.props.rows)
        .fill()
        .map(() => Array(this.props.cols).fill(false))
    };
  }

  componentDidMount() {
    this.seed();
    this.playInterval = setInterval(this.play, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.playInterval);
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridData);
    for (let rowIndex = 0; rowIndex < this.props.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.props.cols; colIndex++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[rowIndex][colIndex] = true;
        }
      }
    }

    this.setState({ gridData: gridCopy });
  };

  getNeighboursCount = (gridData, rowIndex, colIndex, rowsCount, colsCount) => {
    let count = 0;

    const isTopColAlive = rowIndex > 0 && gridData[rowIndex - 1][colIndex];
    const isTopLeftColAlive =
      rowIndex > 0 && colIndex > 0 && gridData[rowIndex - 1][colIndex - 1];
    const isTopRightColAlive =
      rowIndex > 0 &&
      colIndex < colsCount - 1 &&
      gridData[rowIndex - 1][colIndex + 1];

    const isRightColAlive =
      colIndex < colsCount - 1 && gridData[rowIndex][colIndex + 1];
    const isLeftColAlive = colIndex > 0 && gridData[rowIndex][colIndex - 1];

    const isBottomColAlive =
      rowIndex < rowsCount - 1 && gridData[rowIndex + 1][colIndex];
    const isBottomLeftColAlive =
      rowIndex < rowsCount - 1 &&
      colIndex > 0 &&
      gridData[rowIndex + 1][colIndex - 1];
    const isBottomRightColAlive =
      rowIndex < rowsCount - 1 &&
      colIndex < colsCount - 1 &&
      gridData[rowIndex + 1][colIndex + 1];

    if (isTopColAlive) count++;
    if (isTopLeftColAlive) count++;
    if (isTopRightColAlive) count++;

    if (isRightColAlive) count++;
    if (isLeftColAlive) count++;

    if (isBottomColAlive) count++;
    if (isBottomLeftColAlive) count++;
    if (isBottomRightColAlive) count++;

    return count;
  };

  play = () => {
    this.setState(prevState => {
      let { gridData } = prevState;
      let updatedGrid = arrayClone(gridData);

      for (let rowIndex = 0; rowIndex < this.props.rows; rowIndex++) {
        for (let colIndex = 0; colIndex < this.props.cols; colIndex++) {
          const count = this.getNeighboursCount(
            gridData,
            rowIndex,
            colIndex,
            this.props.rows,
            this.props.cols
          );
          const isUnderPopulation = count < 2;
          const isOvercrowding = count > 3;
          const isReproduction = count === 3;

          if (
            gridData[rowIndex][colIndex] &&
            (isUnderPopulation || isOvercrowding)
          )
            updatedGrid[rowIndex][colIndex] = false;

          if (!gridData[rowIndex][colIndex] && isReproduction)
            updatedGrid[rowIndex][colIndex] = true;
        }
      }

      return {
        gridData: updatedGrid
      };
    });
  };

  render() {
    return (
      <div className={classes.GameOfLife}>
        <h1>Game of life</h1>
        <Grid
          rows={this.props.rows}
          cols={this.props.cols}
          gridData={this.state.gridData}
          render={(squareStatus, rowIndex, colIndex) => (
            <StatusSquare
              key={`row_${rowIndex}_col_${colIndex}`}
              isOK={squareStatus}
            />
          )}
        />
      </div>
    );
  }
}

export default GameOfLife;
