import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class NormalText extends Component {
  state = {
    textInput: "",
    isModifying: false
  };

  element = {
    asset: "text",
    div: this.props.clickedBox,
    argv: {
      text: ""
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elementInfo.asset !== "null") {
      return {
        textInput: nextProps.elementInfo.argv.text
      };
    }
    return null;
  }

  handleChange = e => {
    this.setState({
      textInput: e.target.value
    });
  };

  handleSubmit = e => {
    console.log("제출! 그냥 state의 textinput만 전달하면 됩니당!");
    console.log(this.state.textInput);
    this.element.argv.text = this.state.textInput;
    this.props.onCreate(this.element);
    this.setState({
      textInput: ""
    });
    this.element = {
      asset: "text",
      div: this.props.clickedBox,
      argv: {
        text: ""
      }
    };
  };

  modify = e => {
    console.log("MODIFY!!!!!!!!!!!");
    e.preventDefault();
    this.element.argv.text = this.state.textInput;
    console.log("띠링띠링띠링띠링띠링띠링띠링", this.element);
    this.props.updateElement(this.element);
    this.setState({
        textInput: ""
    });
  };

  render() {
    let button;
    console.log("STATE!!!!!!!!!!!", this.state.isModifying);
    console.log("dfkjkfjdkfjkfjkf",this.element.div)
    if (this.state.isModifying === true) {
      button = (
        <Button variant="contained" onClick={this.modify}>
          Modify!
        </Button>
      );
    } else {
      button = (
        <Button variant="contained" onClick={this.handleSubmit}>
          Submit!
        </Button>
      );
    }

    return (
      <div>
        <TextField
          id="outlined-textarea"
          label="Normal Text"
          placeholder="Text!!"
          multiline
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.textInput}
        />
        {button}
      </div>
    );
  }
}

export default NormalText;
