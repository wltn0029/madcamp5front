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
import $ from 'jquery';

// ***새로추가한부분***
String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
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

function showBoxComponent(props){
  return props.text;
}

class Center extends Component {
  constructor() {
    super();
    this.displayData = [];
  }
  state = {
    textValue: "initial value",
    showdata: this.displayData,
    checkAdd: true,
    checkcheck: true,
    boxes: [],
    elements:[],
    boxArray:[],
  };

  elementClick = (element) => {
    console.log("it's from Center!", element);
    // 여기서도 프롭스로 받아야됨
    this.props.elementClick(element);
  }

  splitHR = e => {
    console.log("split HR!");
  }

  changeBoxState = e => {
    console.log("change box state!");
    this.props.RemoveBox();
  }

  makeTree=(index)=>{
    //check it is leaf node or not
    console.log("this.state.boxArray",this.state.boxArray)
    if(this.state.boxArray[index].orientation === null){
      let droppableStyle = {
        backgroundColor: "#555",
        width: "",
        height: "",
        border: "solid 1px yellow"
      };
      console.log("center box",this.state.boxes)
      let box = this.state.boxes.find(box=>{
        return box.name === this.state.boxArray[index].name
      })
      let height = box.height;
      let width = box.width;
      droppableStyle.width = width;
      droppableStyle.height = height
      console.log("maketree",this.state.elements)
      return (
        <div>
          <DroppableBox
              boxClicked = {this.props.boxClicked}
              boxId = {box.name}
              elements={this.state.elements}
              whenSomethingCame={this.props.elementMove}
              elementClick={this.props.elementClick}
              style = {droppableStyle}
          />
        </div>
      )
    }
    //if not, set wrapper division
    else{
      return(      
      <div style={{ display: 'flex', flexDirection: this.state.boxArray[index].orientation }}>
        {this.makeTree(index*2+1)}
        {this.makeTree(index*2+2)}
      </div>
      )
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elements !== prevState.elements || 
      nextProps.boxes!==prevState.boxes || 
      nextProps.direction !== prevState.direction ||
      nextProps.boxArray !== prevState.boxArray) {
      console.log(" nextProps.boxes", nextProps.boxes)
      console.log("prevstate boxarray",prevState.boxArray)
      justCheck = true;
      return { elements: nextProps.elements,
                boxes : nextProps.boxes,
                direction : nextProps.direction,
                boxArray : nextProps.boxArray};
    }
    return null;
  }

  render() {
    const { classes,elements } = this.props;
    // console.log("center element",elements);
    let division = (
      <DivisionContent />
    );
    
    console.log("boxarray",this.state.boxArray);
    let showbox = this.makeTree(0)
    return (
      <div>
        {showbox}
         {/* <div className="Container" dangerouslySetInnerHTML={{__html: showBox}}></div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          { division }
          {/* <div style={{border: "1px solid black"}}>dkjfsfj</div> */}
        </div>
          <div>s
          {/* division 나눌 수 있게 버튼 추가한 카드 */}
          <Card className={classes.card}>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>this.props.splitBox("column")}
              >
                Split Column
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>this.props.splitBox("row")}
              >
                Split Row
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Center);
