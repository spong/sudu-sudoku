import React, {Component} from 'react';

export default class RadialInput extends React.Component {
  onInputReceived(e, i) {
    const {cb, selectedCell} = this.props;
    if (cb) {
      cb(i, selectedCell);
    }
  }

  render() {
    let top = 100;
    let left = 100;
    const {selectedCell} = this.props;
    if (selectedCell) {
      ({top, left} = document.getElementById(`square-${selectedCell}`).getBoundingClientRect());
    }
    const style = {
      display: (selectedCell) ? 'grid' : 'none',
      top: `${top}px`,
      left: `${left}px`,
    };
    return (
      <div className="ri-container" style={style}>
        {[...Array(9).keys()].map(i => (
          <button
            type="button"
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
