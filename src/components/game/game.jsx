import React from 'react';
import Board from './board';
import RadialInput from './radial-input';
import GameControls from './game-controls';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        // squares: Array(81).fill(null),
        squares: [...Array(81)].map(() => Math.floor(Math.random() * 8) + 1)
          .map(e => (Math.random() >= 0.5 ? e : undefined)),
      }],
      selectedCell: 0,
      selectedValue: 0,
      showRadialInput: false,
      stepNumber: 0,
      xIsNext: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }


  handleButtonPress() {
    this.buttonPressTimer = setTimeout(() => {
      this.setState({
        showRadialInput: true
      })
    }, 300);
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  handleClick(i, value) {
    let { history } = this.state;
    const { stepNumber, xIsNext } = this.state;
    history = history.slice(0, stepNumber + 1);

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
      selectedValue: value,
      showRadialInput: i === 0,
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  handleKeyPress(e, i) {
    // eslint-disable-next-line no-console
    console.log(`${e.key} ${i}`);

    let { selectedCell } = this.state;
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
    let { history } = this.state;
    const { stepNumber } = this.state;
    history = history.slice(0, stepNumber + 1);

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
    const { history, selectedCell, selectedValue, stepNumber, showRadialInput } = this.state;
    const current = history[stepNumber];
    // const winner = calculateWinner(current.squares);

    // const moves = history.map((step, move) => {
    //   const desc = move
    //     ? `Go to move #${move}`
    //     : 'Go to game start';
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   );
    // });

    // let status;
    // if (winner) {
    //   status = `Winner: ${winner}`;
    // } else {
    //   status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    // }

    return (
      <div className="game">
        {showRadialInput &&
          <RadialInput
          selectedCell={selectedCell}

          cb={(i, cell) => this.handleInput(i, cell)}
        />}
        <div className="game-board">
          <Board
            squares={current.squares}
            selectedCell={selectedCell}
            selectedValue={selectedValue}
            onClick={(i, v) => this.handleClick(i, v)}
            onTouchStart={i => this.handleButtonPress(i)}
            onTouchEnd={i => this.handleButtonRelease(i)}
            onMouseDown={i => this.handleButtonPress(i)}
            onMouseUp={i => this.handleButtonRelease(i)}
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
