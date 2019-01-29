import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NormalText extends Component {
    state = {
        textInput: "",
    }

    element = {
        asset: "text",
        div: 'box1',
        argv: {
      	text : ""
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                textInput: nextProps.elementInfo.argv.text,
            }
        }
        return null;
    }

    handleChange = (e) => {
        this.setState({
            textInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        console.log("제출! 그냥 state의 textinput만 전달하면 됩니당!");
        console.log(this.state.textInput);
        this.element.argv.text = this.state.textInput;
        this.props.onCreate(this.element);
        this.setState({
            textInput: ""
        });
        this.element = {
            asset: "text",
            div: 'box1',
            argv: {
            text : ""
            }
        };
    }

    render() {

        
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
                <Button
                    variant="contained"
                    onClick={this.handleSubmit}>
                    Submit!
                </Button>
            </div>
        );
    }
}

export default NormalText;