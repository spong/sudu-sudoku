import React from 'react';

export default function Square(props) {
  function getNeighborCells(id) {
    if (id === 0) {
      return [];
    }
    const row = Math.ceil(id / 9) - 1;
    const column = id % 9 ? id % 9 : 9;

    // Calculate values at selected row/column
    const rows = Array.from({length: 9}, (v, k) => (row * 9) + (k + 1));
    const columns = Array.from({length: 9}, (v, k) => (k * 9) + column);

    // Calculate block home to then find all peers in block containing selection
    let [selectedRow, selectedColumn] = [row, column - 1];
    while (selectedRow % 3 !== 0) {
      selectedRow--;
    }
    while (selectedColumn % 3 !== 0) {
      selectedColumn--;
    }

    let blockHome = selectedRow * 9 + selectedColumn + 1;
    let block = [0, 1, 2, 9, 10, 11, 18, 19, 20].map((v) => v + blockHome);

    return rows.concat(columns).concat(block);
  }

  const neighborCells = getNeighborCells(props.selectedCell);

  const classes = [
    'square',
    props.id % 2 === 0 ? 'even' : 'odd',
    (props.value || props.isSelected) && props.selectedValue === props.value ? 'selected' : '',
    !props.isSelected && neighborCells.includes(props.id) ? 'neighbor-selected' : '',
  ];
  return (
    <button
      id={`square-${props.id}`}
      className={classes.join(" ")}
      onClick={() => props.onClick(props.value)}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      value={props.value}
      onKeyDown={props.onKeyPress}
    >
      {props.value}
    </button>
  );
}
