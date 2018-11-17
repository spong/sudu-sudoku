import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(i) {
    const { squares, selectedCell, onClick, onKeyPress } = this.props;
    return (
      <Square
        key={i}
        id={i}
        value={squares[i - 1]}
        isSelected={this.props.selectedCell === i}
        selectedCell={this.props.selectedCell}
        selectedValue={this.props.selectedValue}
        onClick={(v) => this.props.onClick(i, v)}
        onTouchStart={() => this.props.onTouchStart(i)}
        onTouchEnd={() => this.props.onTouchEnd(i)}
        onMouseDown={() => this.props.onMouseDown(i)}
        onMouseUp={() => this.props.onMouseUp(i)}
        onKeyPress={e => this.props.onKeyPress(e, i)}
      />
    );
  }

  renderRow(row) {
    return (
      <div key={`board-row${row}`} className="board-row">
        {[...Array(9).keys()].map(i => this.renderSquare(i + 1 + (row * 9)))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {[...Array(9).keys()].map(i => this.renderRow(i))}
      </div>
    );
  }
}
