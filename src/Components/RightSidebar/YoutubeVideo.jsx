import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class YoutubeVideo extends Component {
    state = {
        videourl: "",
    }

    element = {
        asset:"youtube",
        div: 'box',
        argv: {
            link:""
    
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                videourl: nextProps.elementInfo.argv.link,
            }
        }
        return null;
    }

    handleChange = (e) => {
        this.setState({
            videourl: e.target.value
        });
    }

    handleSubmit = (e) => {
        console.log("제출! 그냥 state의 videourl만 전달하면 됩니당!");
        console.log(this.state.videourl);
        this.element.argv.llnk = this.state.videourl;
        this.props.onCreate(this.element);
        // 전달하기1!!
        this.setState({
            videourl: ""
        });
        this.element.argv.link = "";
    }

    render() {

        return (
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Youtube Url"
                    placeholder="Youtube Url"
                    multiline
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.videourl}
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

export default YoutubeVideo;