import React from 'react';
import ReactDOM from 'react-dom';
// import {Motion, spring} from 'react-motion';
import './index.css';

class RadialInput extends React.Component {
  onInputReceived(e, i) {
    if (this.props.cb) {
      this.props.cb(i, this.props.selectedCell);
    }
  }

  render() {
    let top = 100; let
      left = 100;

    if (this.props.selectedCell) {
      ({ top, left } = document.getElementById(`square-${this.props.selectedCell}`).getBoundingClientRect());
    }
    const style = {
      display: (this.props.selectedCell) ? 'grid' : 'none',
      top: `${top}px`,
      left: `${left}px`,
    };
    return (
      <div className="ri-container" style={style}>
        {[...Array(9).keys()].map(i => (
          <button
            key={i + 1}
            className="ri-button"
            onClick={e => this.onInputReceived(e, i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
}

function Square(props) {
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
      value={props.value}
      onKeyDown={props.onKeyPress}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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

class InputSquare extends React.Component {
  render() {
    return (
      <div />
    );
  }
}

class GameControls extends React.Component {
  render() {
    return (
      <div>
                Helloooo, World! :)
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        // squares: Array(81).fill(null),
        squares: [...Array(81)].map(() => Math.floor(Math.random() * 8) + 1).map(e => (Math.random() >= 0.5 ? e : undefined)),
      }],
      selectedCell: 0,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // if (calculateWinner(squares) || squares[i]) {
    //     return;
    // }
    this.setState({
      history: history.concat([{
        squares,
      }]),
      selectedCell: i,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleKeyPress(e, i) {
    console.log(`${e.key} ${i}`);

    let selectedCell = this.state.selectedCell;
    if (e.key === 'Escape') {
      selectedCell = null;
    } else if (e.which >= 49 && e.which <= 57) {
      this.handleInput(e.key, i);
      selectedCell = null;
    } else {
      return;
    }

    this.setState({
      selectedCell,
    });
  }

  handleInput(i, cell) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    squares[cell - 1] = i;

    this.setState({
      history: history.concat([{
        squares,
      }]),
      selectedCell: null,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    // if (winner) {
    //   status = `Winner: ${winner}`;
    // } else {
    //   status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    // }

    return (
      <div className="game">
        <RadialInput
          selectedCell={this.state.selectedCell}
          cb={(i, cell) => this.handleInput(i, cell)}
        />
        <div className="game-board">
          <Board
            squares={current.squares}
            selectedCell={this.state.selectedCell}
            onClick={i => this.handleClick(i)}
            onKeyPress={(e, i) => this.handleKeyPress(e, i)}
            tabIndex="0"
          />
        </div>
        <div className="game-info">
          <GameControls />
        </div>
        {/* <div className="status">{status}</div> */}
        {/* <ol>{moves}</ol> */}
        {/* </div> */}
        {/* <Motion defaultStyle={{x: 0}} style={{x: spring(100)}}> */}
        {/* {value => <div>{value.x}</div>} */}
        {/* </Motion> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
);
