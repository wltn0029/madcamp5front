import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ResponsiveImage extends Component {
    state = {
        imgurl: "",
    }

    element = {
        asset:"image",
        div: 'box',
        argv: {
            imgurl : ""
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                imgurl: nextProps.elementInfo.argv.imgurl,
            }
        }
        return null;
    }

    handleChange = (e) => {
        this.setState({
            imgurl: e.target.value
        });
        console.log(this.state.imgurl);
    }

    handleSubmit = (e) => {
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
    }

    render() {

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
                <Button
                    variant="contained"
                    onClick={this.handleSubmit}>
                    Submit!
                </Button>
            </div>
        );
    }
}

export default ResponsiveImage;