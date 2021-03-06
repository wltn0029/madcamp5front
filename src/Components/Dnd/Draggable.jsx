import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Draggable extends Component {

    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
        e.dataTransfer.setData('transferInfo', JSON.stringify(this.props.info));
    }

    noAllowDrop = (e) => {
        e.stopPropagation();
    }

    handleClick = (e) => {
        this.props.elementClick(this.props.element);
    }

    render() {
        return (
            <div onClick={this.handleClick} id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style} style={{ margin: "5px", float: "left", width: "auto", border: "solid 1px white" }}>
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;