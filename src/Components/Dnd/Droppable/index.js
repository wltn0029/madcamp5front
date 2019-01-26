import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Droppable extends Component {
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    const dataInfo = JSON.parse(e.dataTransfer.getData('transferInfo'));
    e.target.appendChild(document.getElementById(data));
    this.props.whenSomethingCame(dataInfo);
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default Droppable;