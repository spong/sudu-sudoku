import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        id={i}
        value={this.props.squares[i - 1]}
        isSelected={this.props.selectedCell === i}
        onClick={() => this.props.onClick(i)}
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
