for (let rowIndex = 0; rowIndex < this.rows; i++) {
  for (let colIndex = 0; colIndex < this.cols; colIndex++) {
    let count = 0;
    if (rowIndex > 0) if (gridData[rowIndex - 1][colIndex]) count++;
    if (rowIndex > 0 && colIndex > 0)
      if (gridData[rowIndex - 1][colIndex - 1]) count++;
    if (rowIndex > 0 && colIndex < this.cols - 1)
      if (gridData[rowIndex - 1][colIndex + 1]) count++;
    if (colIndex < this.cols - 1) if (gridData[rowIndex][colIndex + 1]) count++;
    if (colIndex > 0) if (gridData[rowIndex][colIndex - 1]) count++;
    if (rowIndex < this.rows - 1) if (gridData[rowIndex + 1][colIndex]) count++;
    if (rowIndex < this.rows - 1 && colIndex > 0)
      if (gridData[rowIndex + 1][colIndex - 1]) count++;
    if (rowIndex < this.rows - 1 && colIndex < this.cols - 1)
      if (gridData[rowIndex + 1][colIndex + 1]) count++;
    if (gridData[rowIndex][colIndex] && (count < 2 || count > 3))
      updatedGrid[rowIndex][colIndex] = false;
    if (!gridData[rowIndex][colIndex] && count === 3)
      updatedGrid[rowIndex][colIndex] = true;
  }
}
