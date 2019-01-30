import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ResponsiveImage extends Component {
  state = {
    imgurl: "",
    isModifying: false
  };

  element = {
    asset: "image",
    div: this.props.clickedBox,
    argv: {
      imgurl: ""
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elementInfo.asset !== "null") {
      return {
        imgurl: nextProps.elementInfo.argv.imgurl
      };
    }
    return null;
  }

  handleChange = e => {
    this.setState({
      imgurl: e.target.value
    });
    console.log(this.state.imgurl);
  };

  handleSubmit = e => {
    console.log("제출! 그냥 state의 imgurl만 전달하면 됩니당!");
    console.log(this.state.imgurl);
    this.element.argv.imgurl = this.state.imgurl;
    console.log(this.element.argv.imgurl, "#333333333333333333333333");
    console.log("#@@@@@@@@@@@@@@@@@@@", this.element.argv.imgurl);

    // 전달하기1!!
    this.props.onCreate(this.element);
    console.log("dkkkkkkkkkkkkkkkkkkkkkkkkkk", this.element);
    // this.element.argv.imgurl = "";
    this.setState({
      imgurl: ""
    });
  };

  modify = e => {
    console.log("MODIFY!!!!!!!!!!!");
    e.preventDefault();
    this.element.argv.imgurl = this.state.imgurl;
    console.log("띠링띠링띠링띠링띠링띠링띠링", this.element);
    this.props.updateElement(this.element);
    this.setState({
        imgurl: ""
    });
  };

  render() {
    let button;
    console.log("STATE!!!!!!!!!!!", this.state.isModifying);
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
          label="Image Url"
          placeholder="Image Url"
          multiline
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.imgurl}
        />
        {button}
      </div>
    );
  }
}

export default ResponsiveImage;
