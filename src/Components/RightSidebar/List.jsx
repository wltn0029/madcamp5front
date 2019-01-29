import React, {Component} from 'react'
import classNames from 'classnames';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles =theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
});

class List extends Component{

    state ={
        count:"",
        menu:[],
        menuValue:"",
        link:[], 
        linkValue:"",
        editing : true,          
    }

    element = {
        asset : "list",
        orientation : "vertical",
        div : 'box',
        argv: {
            count:"",
            menu:[],
            link:[],   
        } 
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                menu: nextProps.elementInfo.argv.menu, 
                link: nextProps.elementInfo.argv.link,
                count: nextProps.elementInfo.argv.count,
            }
        }
        return null;
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.element.argv.count = this.state.count;
        this.element.argv.menu = this.state.menu;
        this.element.argv.link = this.state.link;
        console.log(this.element)
        if(this.state.editing){
            this.props.onCreate(this.element)
        }
        this.setState({
            editing:!this.state.editing
        })
    }

    AddMenu = ()=>{
        let data = this.state.menuValue
        this.setState({
            menu : this.state.menu.concat(data)
        })
        console.log("chipdata",this.state.chipData)
    }

    AddLink =()=>{
        let data = this.state.linkValue
        this.setState({
           link : this.state.link.concat(data)
        })
        console.log("chiplink",this.state.chiplink)
    }

    menuDelete = (data)=>{
        const chipToDelete = this.state.chipData.indexOf(data);
        this.setState({
            chipData : this.state.chipData.filter(data => data.id !== chipToDelete.key)
        })
    }

    render(){
        const classes = useStyles;
        return(
            <form className ={classes.container}
                  onSubmit={this.handleSubmit}
                  noValidate autoComplete = "off">
               <TextField
                    id="standard-textarea"
                    label="Menu"
                    placeholder="Add multiple menu!"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    name="menuValue"
                    value={this.state.menuValue}
                />    
                <Fab color="primary" 
                     aria-label="Add" 
                     className={classes.fab}
                     style ={{bottom: "-20px"}}
                     size='small'
                     name = "menu"
                     onClick = {() => this.AddMenu()}>
                    <AddIcon />
                </Fab> 
                <Paper className={classes.root}
                        placeholder = "menu">
                    {this.state.menu.map(data => {
                        return (
                        <SnackbarContent
                            className={classes.snackbar}
                            message={data}
                            action = {()=>{
                                return(
                                    <Button color = "secondary"
                                        size = "small"
                                        onClick={()=>this.handleDelete(data)}>
                                    Delete        
                                </Button>
                                )
                                
                            }}
                        />
                        );
                    })}
                </Paper>
            </form>
        )
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default List;