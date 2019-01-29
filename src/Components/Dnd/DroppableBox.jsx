import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

import "bootstrap/dist/css/bootstrap.css";

const Wrapper = styled.div`
  display: flex;
`;


class DroppableBox extends Component {
  state = {
    onlyForSetState : true,
    elements: [],
    renderr: true,
    style: {}
  }
  
  width = "1200px"
  height ="500px"

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("prevState.boxElements >>>> ", prevState.elements);
    if (nextProps.elements !== prevState.elements || nextProps.style !== prevState.style) {
      console.log("nextProps.boxElements >>>> ", nextProps.elements);
      return {style: nextProps.style,
              elements : nextProps.elements}
    }
    return null;
  }

  // navbar 안의 리스트 컴포넌트??만들어주기
  navbarlist = element => {
    return element.argv.menu.map(item => (
      <li className="nav-item" key={item}>
        <a className="nav-link" href="#">
          {item}
        </a>
      </li>
    ));
  };

  // navbar 만들어주는... 코드가 너무 길어서... 버튼은 짧은데...
  createnavbar = element => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

  // progress 만들어주기... 입력한 값에 따라 다르게 나오게 바꿔줘야됨
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
      <li key={item} className="list-group-item">
        {item}
      </li>
    ));
    return <ul className="list-group">{listItems}</ul>;
  };

  // Titlebar 만들어주기
  createTitlebar = element => {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">{element.argv.title}</h1>
          <p className="lead">{element.argv.descrpition}</p>
        </div>
      </div>
    );
  };

  // Billboard 만들어주기... 좀 이상해서 그냥 아무사진이나 막갖다넣음
  createBillboard = element => {
    return (
      <img
        width="100%"
        src="https://media-assets-01.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-109131-this_billboard_deserves_an_oscar_sylva--2x1--940.png"
      />
    );
  };

  // Card 만들어주기, 이상하게 잘 안돼...
  createCard = element => {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img alt="..." className="card-img-top" src={element.argv.imgurl} />
        <div className="card-body">
          <h5 className="card-title">{element.argv.title}</h5>
          <p className="card-text">{element.argv.description}</p>
          <a className="btn btn-primary" href="https://www.kaist.ac.kr">
            {element.argv.btntext}
          </a>
        </div>
      </div>
    );
  };

  //Text 만들어주기
  createText = element => {
    return <p>{element.argv.text}</p>;
  };

  // Image 만드러주기
  createImage = element => {
    return (
      <img
        alt="Responsive image"
        className="img-fluid"
        src={element.argv.imgurl}
      />
    );
  };

  // Youtube 만들어주기
  createYoutube = element => {
    return;
  };

  elementMove = element => {
    this.props.whenSomethingCame(element, this.props.boxId);
  };


  render() {
    const { elements, boxId, style } = this.props;
    // const { style } = this.state;
    console.log("droppable box elements", elements);
    // 만약에 박스 state가 false이면 아예 렌더링 하지말라고...
    
    let showbox = elements.map(element => {
        if (element.div === boxId) {
          if(element.asset === "button"){
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
          }else if (element.asset === "navbar") {
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
          } else if (element.asset === "titlebar") {
            return (
              <Draggable
                id={element.id}
                style={{ margin: "8px" }}
                info={element}
                key={element.ic}
              >
                {this.createTitlebar(element)}
              </Draggable>
            );
          } else if (element.asset === "billboard") {
            return (
              <Draggable
                id={element.id}
                style={{ margin: "8px" }}
                info={element}
                key={element.id}
              >
                {this.createBillboard(element)}
              </Draggable>
            );
          } else if (element.asset === "card") {
            return (
              <Draggable
                id={element.id}
                style={{ margin: "8px" }}
                info={element}
                key={element.id}
              >
                {this.createCard(element)}
              </Draggable>
            );
          } else if (element.asset === "text") {
            return (
              <Draggable
                id={element.id}
                style={{ margin: "8px" }}
                info={element}
                key={element.id}
              >
                {this.createText(element)}
              </Draggable>
            );
          } else if (element.asset === "image") {
            return (
              <Draggable
                id={element.id}
                style={{ margin: "8px" }}
                info={element}
                key={element.id}
              >
                {this.createImage(element)}
              </Draggable>
            );
          } else {
            return null;
          }
          
        } 
      })
        return (
          <div onClick ={()=>this.props.boxClicked(boxId)}>
            <Wrapper>
              <Droppable
                style={style}
                whenSomethingCame={this.elementMove}
              >
                {showbox}
              </Droppable>
            </Wrapper>
          </div>
        );
    }
  }

export default DroppableBox;
