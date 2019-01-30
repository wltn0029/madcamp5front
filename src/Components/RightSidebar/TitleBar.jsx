import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class TitleBar extends Component {
  state = {
    title: "",
    description: "",
    editing: true,
    isModifying: false
  };

  element = {
    asset: "titlebar",
    orientation: " vertical",
    div: "box",
    argv: {
      title: "",
      description: ""
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.elementInfo.asset !== "null") {
      return {
        title: nextProps.elementInfo.argv.title,
        description: nextProps.elementInfo.argv.description,
        isModifying: nextProps.isModifying
      };
    }
    return null;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.element.argv.title = this.state.title;
    this.element.argv.description = this.state.description;
    console.log(this.element);
    if (this.state.editing) {
      this.props.onCreate(this.element);
    }
    this.setState({
      editing: !this.state.editing
    });
  };

  modify = e => {
    console.log("MODIFY!!!!!!!!!!!");
    e.preventDefault();
    this.element.argv.title = this.state.title;
    this.element.argv.description = this.state.description;
    console.log(this.element);
    this.props.updateElement(this.element);
    this.setState({
      title: "",
      description: ""
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
    const classes = useStyles;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="standard-textarea"
          label="Title"
          placeholder="Write your title"
          multiline
          className={classes.textField}
          margin="normal"
          name="title"
          onChange={this.handleChange}
        />
        <TextField
          id="standard-textarea"
          label="Description"
          placeholder="Write description"
          multiline
          className={classes.textField}
          margin="normal"
          name="description"
          onChange={this.handleChange}
        />
        {button}
      </form>
    );
  }
}

export default TitleBar;
