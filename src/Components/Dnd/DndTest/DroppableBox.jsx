import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "../Draggable";
import Droppable from "../Droppable";

import "bootstrap/dist/css/bootstrap.css";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;

const droppableStyle = {
  backgroundColor: "#555",
  width: "250px",
  height: "400px",
  margin: "32px"
};

class DroppableBox extends Component {
  // navbar 안의 리스트 컴포넌트??만들어주기
  navbarlist = element => {
    return element.argv.menu.map(item => (
      <li className="nav-item" key={item}>
        <a className="nav-link" href="">
          {item}
        </a>
      </li>
    ));
  };

  // navbar 만들어주는... 코드가 너무 길어서... 버튼은 짧은데...
  createnavbar = element => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id={element.argv.title}
      >
        <a className="navbar-brand" href="#">
          {element.title}
        </a>
        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-target="#navbarSupportedContent"
          data-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {/* navbar 안의 리스트 */}
            {this.navbarlist(element)}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              aria-label="Search"
              className="form-control mr-sm-2"
              placeholder="Search"
              type="search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  };

  // progress 만들어주기
  createProgress = element => {
    return (
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: "25%" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    );
  };

  // List 만들어주기
  createList = element => {
    let listItems = element.argv.menu.map(item => (
      <li key={item} className="list-group-item">{item}</li>
    ));
    return (
      <ul className="list-group">
        {listItems}
      </ul>
    );
  };

  elementMove = element => {
    this.props.whenSomethingCame(element, this.props.boxId);
  };

  render() {
    const { boxId, elements } = this.props;

    let elementList = elements.map(element => {
      if (element.asset === "button") {
        return (
          <Draggable
            id={element.argv.string}
            style={{ margin: "8px" }}
            info={element}
            key={element.argv.string}
          >
            <button type="button" className={element.argv.class}>
              {element.argv.string}
            </button>
          </Draggable>
        );
      } else if (element.asset === "navbar") {
        return (
          <Draggable
            id={element.argv.title}
            style={{ margin: "8px" }}
            info={element}
            key={element.argv.title}
          >
            {this.createnavbar(element)}
          </Draggable>
        );
      } else if (element.asset === "progress") {
        return (
          <Draggable
            id={element.id}
            style={{ margin: "8px" }}
            info={element}
            key={element.id}
          >
            {this.createProgress(element)}
          </Draggable>
        );
      } else if (element.asset === "list") {
        return (
          <Draggable
            id={element.id}
            style={{ margin: "8px" }}
            info={element}
            key={element.id}
          >
            {this.createList(element)}
          </Draggable>
        );
      } else {
        return null;
      }
    });

    return (
      <div>
        <Wrapper>
          <Droppable
            id={boxId}
            style={droppableStyle}
            whenSomethingCame={this.elementMove}
          >
            {elementList}
          </Droppable>
        </Wrapper>
      </div>
    );
  }
}

export default DroppableBox;
