import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles= theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });
  
class TitleBar extends Component{
    state ={
        title : "",
        description : "",
        editing: true,
    }

    element ={
        asset: "titlebar",
        orientation: " vertical",
        div: 'box',
        argv: {
            title: "",
            description: "",
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                title: nextProps.elementInfo.argv.title,
                description: nextProps.elementInfo.argv.description,
            }
        }
        return null;
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.element.argv.title = this.state.title;
        this.element.argv.description = this.state.description;
        console.log(this.element)
        if(this.state.editing){
            this.props.onCreate(this.element)
        }
        this.setState({
            editing:!this.state.editing
        })
    }
    render(){
        const classes = useStyles;
        return(
            <form className={classes.container} noValidate autoComplete="off" onSubmit ={this.handleSubmit}>
              <TextField
                    id="standard-textarea"
                    label="Title"
                    placeholder="Write your title"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    name = "title"
                    onChange ={this.handleChange}
                />
                <TextField
                    id="standard-textarea"
                    label="Description"
                    placeholder="Write description"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    name = "description"
                    onChange ={this.handleChange}
                />
                <Button variant="contained" 
                    size="small" 
                    className={classes.button}
                    type = "submit">
                    { this.state.editing ? 'apply' : 'change'}
                </Button>
        </form>
        )
        
    }
}

export default TitleBar;