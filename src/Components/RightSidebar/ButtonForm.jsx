import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing.unit,
      },
      bootstrapFormLabel: {
        fontSize: 18,
      },
      button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
  });

  const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);


class ButtonForm extends Component{

    state ={
        class:"",
        string:"",
        href:"", 
        editing : true,    
        setOpen : false,
        isModifying: false,      
    }

    element = {
        asset : "button",
        orientation : "vertical",
        div : 'box',
        argv: {
            class:"",
            string:"",
            href:"",   
        } 
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.element.argv.class = this.state.class;
        this.element.argv.string = this.state.string;
        this.element.argv.href = this.state.href;
        console.log("띠링띠링띠링띠링띠링띠링띠링", this.element)
        if(this.state.editing){
            this.props.onCreate(this.element)
        }
        this.setState({
            editing:!this.state.editing
        })
    }

    handleClose(){
        this.setState({
            setOpen : false
        })
    }

    handleOpen(){
        this.setState({
            setOpen : true
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("it's in getderivedstatefromprops", nextProps.elementInfo.asset);
        if (nextProps.elementInfo.asset !== "null") {
            return {
                string: nextProps.elementInfo.argv.string,
                href: nextProps.elementInfo.argv.href,
                class: nextProps.elementInfo.argv.class,
                isModifying: nextProps.isModifying
            }
        }
        return null;
    }
    
    render(){
        const {classes, elementInfo} = this.props;
        console.log("this.state.string", this.state.string);
        console.log("this.state.string", this.state.href);
        return(
            <form className={classes.root} autoComplete="off" onSubmit ={this.handleSubmit}>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
                    Color
                </InputLabel>
                <Select
                    name = "class"
                    value={this.state.class}
                    onChange={this.handleChange}
                    input={<BootstrapInput name="age" id="age-customized-select" />}
                >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={"btn btn-primary"}>Blue</MenuItem>
                <MenuItem value={"btn btn-secondary"}>Gray</MenuItem>
                <MenuItem value={"btn btn-success"}>Green</MenuItem>
                <MenuItem value={"btn btn-danger"}>Red</MenuItem>
                <MenuItem value={"btn btn-warning"}>Yellow</MenuItem>
                <MenuItem value={"btn btn-info"}>Mint</MenuItem>
                <MenuItem value={"btn btn-light"}>Light Gray</MenuItem>
                <MenuItem value={"btn btn-dark"}>Black</MenuItem>
                </Select>
             </FormControl>
             <FormControl className={classes.textField}>
             <TextField
                id="standard-uncontrolled"
                label="Button Name"
                value={this.state.string}
                margin="normal"
                onChange = {this.handleChange}
                name = "string"
             />
            </FormControl>
            <FormControl className={classes.textField}>
             <TextField
                id="standard-uncontrolled"
                label="Reference"
                margin="normal"
                onChange = {this.handleChange}
                name = "href"
             />
            </FormControl>
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


 ButtonForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(ButtonForm);