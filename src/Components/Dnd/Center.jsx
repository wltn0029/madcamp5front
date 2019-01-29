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

// ***새로추가한부분***
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
    boxes: [],
    elements:[],
  };

  splitHR = e => {
    console.log("split HR!");
  }

  changeBoxState = e => {
    console.log("change box state!");
    this.props.RemoveBox();
  }

  divSelect = (e) => {
    const selectedbox = e.target.boxId;
    this.setState({
      selectedBox: selectedbox
    });
    console.log(this.state.selectedBox);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elements !== prevState.elements || nextProps.boxes!==prevState.boxes) {
      console.log("center elements>>>>> from parent",nextProps.elements)
      justCheck = true;
      return { elements: nextProps.elements,
                boxes : nextProps.boxes};
    }
    return null;
  }

  render() {
    const { classes, elementMove } = this.props;
    console.log("rendered!");

    let division = (
      <DivisionContent />
    );


    // ***새로추가한부분***
    
    console.log("parent boxes>>>>>>>>>",this.state.boxes)
    let showBox =this.state.boxes.map(box=>{
      return (
        <DroppableBox
            boxId = {box.name}
            elements={this.state.elements}
            whenSomethingCame={elementMove}
        />
      )
    })
    console.log("showbox>>>>>>>",showBox)
    return (
      <div>
        <div>
          {showBox}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          { division }
          {/* <div style={{border: "1px solid black"}}>dkjfsfj</div> */}
        </div>
        <div>
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
      </div>
    );
  }
}

export default withStyles(styles)(Center);
