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
let box4 = [];
let box5 = [];
let box6 = [];
let box7 = [];
let box8 = [];
let box9 = [];

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
  };

  splitHR = e => {
    console.log("split HR!");
  }

  divSelect = (e) => {
    const selectedbox = e.target.boxId;
    this.setState({
      selectedBox: selectedbox
    });
    console.log(this.state.selectedBox);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elements !== prevState.elements) {
      console.log("props >>>> ", nextProps.elements);
      justCheck = true;
      box1 = [];
      box2 = [];
      box3 = [];
      return { elements: nextProps.elements };
    }
    return null;
  }

  render() {
    const { classes, elementMove } = this.props;
    console.log("rendered!");

    let division = (
      <DivisionContent />
    );

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DroppableBox
            boxId="box1"
            elements={box1}
            whenSomethingCame={elementMove}
            onClick={this.divSelect}
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Center);
