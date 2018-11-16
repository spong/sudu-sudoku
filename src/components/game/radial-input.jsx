import React from 'react';

export default class RadialInput extends React.Component {
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
