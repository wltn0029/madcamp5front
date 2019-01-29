import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import { ListItemIcon } from '@material-ui/core';

class BillBoard extends Component {
    // urlArray에 url들 저장해서, 나중에 submit 할 때 한꺼번에 전달하면 됩니당
    state = {
        inputVal: "",
        urlArray: [],
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addMoreURl = (e) => {
        let tempArray = this.state.urlArray;
        tempArray.push(this.state.inputVal);
        this.setState({
            urlArray: tempArray
        });
        this.setState({
            inputVal: ""
        })
        console.log(this.state.urlArray);
    }

    submit = (e) => {
        console.log("제출은 나중에...", this.state.urlArray);
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    onClick={this.addMoreURl}>
                    Add more images!
                </Button>
                <TextField
                    id="standard-name"
                    label="image url"
                    margin="normal"
                    placeholder="put image url here!"
                    onChange={this.handleChange}
                    value={this.state.inputVal}
                    name="inputVal"
                />

                <List>
                    {this.state.urlArray.map(item => {
                        return (
                            <ListItem key={item}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText secondary={item} />
                            </ListItem>
                        );
                    })}
                </List>

                <Button
                    variant="contained"
                    onClick={this.submit}>
                    Submit!
                </Button>
            </div>
        );
    }
}

export default BillBoard;