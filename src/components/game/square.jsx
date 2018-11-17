import React from 'react';
import Board from "./board";

export default function Square(props) {
  const classes = [
    'square',
    props.id % 2 === 0 ? 'even' : 'odd',
    props.isSelected ? 'selected' : '',
  ];
  return (
    <button
      id={`square-${props.id}`}
      className={`square ${props.id % 2 === 0 ? 'even' : 'odd'} ${props.isSelected ? 'selected' : ''}`}
      onClick={props.onClick}
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
