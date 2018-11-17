import React from 'react';

export default function Square(props) {
  function getNeighborCells(id) {
    if (id === 0) {
      return [];
    }
    const row = Math.ceil(id / 9)-1;
    const column = id % 9;

    const rows = Array.from({length: 9}, (v, k) => (row*9) + (k+1));
    const columns = Array.from({length: 9}, (v, k) =>  (k * 9) + column);
    return rows.concat(columns);
  }

  const neighborCells = getNeighborCells(props.selectedCell);

  const classes = [
    'square',
    props.id % 2 === 0 ? 'even' : 'odd',
    props.selectedValue && props.selectedValue === props.value ? 'selected' : '',
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
