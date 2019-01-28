import React, { Component } from "react";
import styled from "styled-components";
import DroppableBox from "./DroppableBox";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "bootstrap/dist/css/bootstrap.css";
import DivisionContent from "./divisionContent";

let box1 = [];
let box2 = [];
let box3 = [];

// ***새로추가한부분***
let boxes = [];
boxes[0] = {
  name: "box1",
  state: true,
  elements: [],
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

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
    selectedBox: "box1",
    checkcheck: true,
    boxes: [boxes[0]],
  };

  splitHR = e => {
    console.log("split HR!");
  }

  changeBoxState = e => {
    console.log("change box state!");
    this.setState({
      boxes : this.state.boxes.map(box =>{
        if(box.name ==="box1")
           box.state=false
        return box;
      })
    })
  }

  divSelect = (e) => {
    const selectedbox = e.target.boxId;
    this.setState({
      selectedBox: selectedbox
    });
    console.log(this.state.selectedBox);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("state>>>>>>>>>>",prevState.boxes)
    if (nextProps.elements !== prevState.elements) {
      console.log("props >>>> ", nextProps.elements);
      justCheck = true;
      box1 = [];
      box2 = [];
      box3 = [];
      let loopCheck = true;
      nextProps.elements.map(element => {
        prevState.boxes.map(box => {
          if (box.name === element.div) {
            box.elements.push(element);
            loopCheck = false;
          }
        })
      console.log(boxes);
      console.log(prevState.boxes);
      if (loopCheck === true) {
          prevState.boxes.push({
            name: element.div,
            state: true,
            elements: [element],
          });
        }
        loopCheck = true;
      });
    return { elements: nextProps.elements};
    }
    return null;
  }

  setBoxes=()=>{
    boxes = [];
    let loopCheck = true;
    this.state.elements.map(element => {
      boxes.map(box => {
        if (box.name === element.div) {
          box.elements.push(element);
          loopCheck = false;
        }
      });
      if (loopCheck === true) {
        boxes.push({
          name: element.div,
          state: true,
          elements: [element],
        });
      }
      loopCheck = true;
    });
    this.setState({
      boxes: boxes
    })
    console.log("boxes>>> ", boxes);
  }

  render() {
    const { classes, elementMove } = this.props;
    console.log("rendered!");

    let division = (
      <DivisionContent />
    );


    // ***새로추가한부분***
    
    console.log("parent boxes>>>>>>>>>",this.state.boxes)

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DroppableBox
            boxId="box1"
            boxElements={this.state.boxes}
            whenSomethingCame={elementMove}
          />
          {/* <DroppableBox
            boxId="box2"
            elements={box2}
            whenSomethingCame={elementMove}
          />
          <DroppableBox
            boxId="box3"
            elements={box3}
            whenSomethingCame={elementMove}
          /> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          { division }
          {/* <div style={{border: "1px solid black"}}>dkjfsfj</div> */}
        </div>

        {/* 서버에서 받아서 iframe 에다가 코드 넣어줘야함 */}
        {/* <iframe
          width="800px"
          height="200px"
          srcDoc="<html><body>Hello, <b>world</b>.</body></html>"
        /> */}

        {/* division 나눌 수 있게 버튼 추가한 카드 */}
        <Card className={classes.card}>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.splitHR}
            >
              Split horizontally
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Split vertically
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick = {()=>this.changeBoxState()}
            >
              Remove one Component!
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Center);
