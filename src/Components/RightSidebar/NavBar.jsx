import React, {Component} from 'react'
import classNames from 'classnames';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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
    chipFocused: {
    //   backgroundColor: emphasize(
    //     theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
    //     0.08,
    //   ),
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
  });

  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  

class NavBar extends Component{
        
    //for user input 
    state ={
        title:"",
        menu:[],
        link:[],
        editing :true
    }
    //form for server
    element = {
      asset: "navbar",
      orientation: " vertical",
      div: "box1",
      argv: {
          title:"",
          menu:[],
          link:[]
      }
    }
    //when user change value of component
    handleChange=(e)=>{
        console.log("Navbar",e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    //submit value to parent component and initialize it 
    handleSubmit=(e)=>{
        e.preventDefault();
        this.element.argv.title = this.state.title;
        this.element.argv.menu = this.state.menu;
        this.element.argv.link = this.state.link;
        if(this.state.editing){
            this.props.onCreate(this.element)
        }
        this.setState({
            editing:!this.state.editing
        })
    }

    AddMenu = (data)=>{
        this.setState({
            menu : this.state.menu.concat(data)
        })
        console.log(data)
    }

    render(){
        const classes = useStyles;
        const theme = useTheme;
        const selectStyles = {
            input: base => ({
            ...base,
            '& input': {
                font: 'inherit',
            },
            }),
        };
        let menu;
        let link;
        return(
            <form className ={classes.container}
                  noValidate autoComplete ="off" 
                  onSubmit={this.handleSubmit}>
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
                    label="Menu"
                    placeholder="Add multiple menu!"
                    className={classes.textField}
                    margin="normal"
                    value ={menu}
                />    
                <Fab color="primary" 
                     aria-label="Add" 
                     className={classes.fab}
                     style ={{bottom: "-20px"}}
                     size='small'
                     name = "menu"
                     onClick = {this.AddMenu(menu)}>
                    <AddIcon />
                </Fab>
            </form>
        )
    }
}

export default NavBar;