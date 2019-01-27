import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import DroppableBox from "./DroppableBox";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ButtonModify from '../../Components/RightSidebar/ButtonModify';
import ButtonForm from '../../Components/RightSidebar/ButtonForm';
import "bootstrap/dist/css/bootstrap.css";

let box1=[]
let box2=[]
let box3=[]

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const defaultBtnStyle = {
  asset: "button",
  orientation: " vertical",
  div: 1,
  argv: {
    class: "btn btn-primary",
    href: "",
    string: "button"
  }
};

let btnIndx = 7;
let navbarindx = 1;
let progressindx = 1;
let listindx = 1;
let justCheck = true;

class Center extends Component {

  constructor() {
    super();
    this.displayData = [];
  }
  state = {
    textValue: "initial value",
    showdata: this.displayData,
    checkAdd: true,
    boxes : [],
    elements : []
  };

  // elementMove = (element, id) => {
  //   console.log("finally came to parent component!", element, " id:", id);

  //   let project = this.state.elements.find(p => {
  //     return p.argv.string === element.argv.string;
  //   });
  //   project.div = id;
  //   console.log("this.state2.element", this.state.elements);
  // };

  changeText = e => {
    this.setState({
      textValue: e.target.value
    });
    console.log(this.state.textValue);
  };

  static getDerivedStateFromProps(nextProps,prevState){
    if (nextProps.elements !== prevState.elements ) {
      console.log("props >>>> ",nextProps.elements);
      justCheck = true;
      box1=[]
      box2=[]
      box3=[]
      return { elements: nextProps.elements };
    }
    return null;
  }

  // navbar 추가하는 메소드
  addNavbar = e => {
    e.preventDefault();
    let pushingElement = {
      id: "navbar" + navbarindx++,
      asset: "navbar",
      orientation: " vertical",
      div: "box1",
      argv: {
          title:"portals",
          menu:[
              "google",
              "naver",
              "daum"
          ],
          link:[
              "https://google.com",
              "https://naver.com",
              "https://daum.net"
          ]
      }
    };
    box1.push(pushingElement);
    this.state2.elements.push(pushingElement);
    this.setState({
      checkAdd: !this.state.checkAdd
    });
  }

  // 프로그레스 추가하는 메소드
  addProgress = e => {
    e.preventDefault();
    let pushingElement = {
      id: "progress" + progressindx++,
      asset: "progress",
      orientation: " vertical",
      div: "box1",
      argv: {
          percentage: "30"
      }
    };
    box1.push(pushingElement);
    this.state2.elements.push(pushingElement);
    this.setState({
      checkAdd: !this.state.checkAdd
    });
  }

  // list 추가하는 메소드
  addList = e => {
    e.preventDefault();
    let pushingElement = {
      id: "list" + listindx++,
      asset: "list",
      orientation: " vertical",
      div: 1,
      argv: {
          count: 3,
          menu:[
              "google",
              "naver",
              "daum"
          ],
          link:[
              "https://google.com",
              "https://naver.com",
              "https://daum.net"
          ]
      }
    };
    box1.push(pushingElement);
    this.state.elements.push(pushingElement);
    this.setState({
      checkAdd: !this.state.checkAdd
    });
  }

  render() {
    const {elementMove} =this.props;
    console.log("rendered!");
    
    if (justCheck === true) {
      this.state.elements.map(element => {
        if (element.div === "box1") {
          box1.push(element);
        } else if (element.div === "box2") {
          box2.push(element);
        } else {
          box3.push(element);
        }
        return null;
      });
      justCheck = false;
    }

    return (
      <div>
        <Wrapper>
          <DroppableBox
            boxId="box1"
            elements={box1}
            whenSomethingCame={elementMove}
          />
          <DroppableBox
            boxId="box2"
            elements={box2}
            whenSomethingCame={elementMove}
          />
          <DroppableBox
            boxId="box3"
            elements={box3}
            whenSomethingCame={elementMove}
          />
        </Wrapper>
        <div>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Button input"
            fullWidth
            margin="normal"
            value={this.state.textValue}
            onChange={this.changeText}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div>
          {/* <Button variant="contained" color="primary" onClick={this.addButton}>
            Add a button!
          </Button> */}
          <Button variant="contained" color="primary" onClick={this.addNavbar}>
            Add a navbar! 잘 안돼...
          </Button>
          <Button variant="contained" color="primary" onClick={this.addProgress}>
            Add a Progress!
          </Button>
          <Button variant="contained" color="primary" onClick={this.addList}>
            Add a List!
          </Button>
        </div>
      </div>
    );
  }
}

export default Center;
