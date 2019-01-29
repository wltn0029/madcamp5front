import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import { ListItemIcon } from '@material-ui/core';

class Card extends Component {
    // 제출 할 때 그냥 여기있는 값들 제출해주면 돼용...
    state = {
        imgUrl: "",
        title: "",
        description: "",
        btntext: "",
        btnlink: "",
    }

    element = {
        asset: "card",
        div: 'box',
        argv: {
            imgurl:"",
            title :"",
            description: "",
            btntext: "",
            link: "" 	
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                imgUrl: nextProps.elementInfo.argv.imgurl,
                title: nextProps.elementInfo.argv.title,
                description: nextProps.elementInfo.argv.description,
                btntext: nextProps.elementInfo.argv.btntext,
                btnlink: nextProps.elementInfo.argv.link,
            }
        }
        return null;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // imgUrl: "",
    //     title: "",
    //     description: "",
    //     btntext: "",
    //     btnlink: "",

    submitBtn = (e) => {
        e.preventDefault();
        this.element.argv.imgurl = this.state.imgUrl;
        this.element.argv.title = this.state.title;
        this.element.argv.description = this.state.description;
        this.element.argv.btntext = this.state.btntext;
        this.element.argv.link = this.state.btnlink;
        this.setState({
            imgUrl: "",
            title: "",
            description: "",
            btntext: "",
            btnlink: "",
        });
        this.props.onCreate(this.element);
    }

    render() {
        return (
            <div>
                {/* title */}
                <TextField
                    id="standard-name"
                    label="Card Title"
                    margin="normal"
                    placeholder="Title of this Card"
                    onChange={this.handleChange}
                    value={this.state.title}
                    name="title"
                />
                {/* description */}
                <TextField
                    id="standard-name"
                    label="Card description"
                    margin="normal"
                    placeholder="Description of this Card"
                    onChange={this.handleChange}
                    value={this.state.description}
                    name="description"
                />
                {/* imageUrl */}
                <TextField
                    id="standard-name"
                    label="Image URL"
                    margin="normal"
                    placeholder="Image Url"
                    onChange={this.handleChange}
                    value={this.state.imgUrl}
                    name="imgUrl"
                />
                {/* btntext */}
                <TextField
                    id="standard-name"
                    label="Button Text"
                    margin="normal"
                    placeholder="Button Text"
                    onChange={this.handleChange}
                    value={this.state.btntext}
                    name="btntext"
                />
                {/* btnurl */}
                <TextField
                    id="standard-name"
                    label="Button Url"
                    margin="normal"
                    placeholder="Button Url"
                    onChange={this.handleChange}
                    value={this.state.btnlink}
                    name="btnlink"
                />
                <br />
                <Button
                    variant="contained"
                    onClick={this.submitBtn}>
                    Submit!
                </Button>
            </div>
        );
    }
}

export default Card;