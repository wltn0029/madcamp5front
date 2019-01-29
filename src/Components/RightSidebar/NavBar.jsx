import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

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

class NavBar extends Component{
        
    menuKey = 0;
    linkKey =0;

    //for user input 
    state ={
        title:"",
        menuValue: "",
        linkValue:"", 
        menu:[],
        link:[],
        chipData:[],
        chipLink:[],
        editing :true
    }
    //form for server
    element = {
      asset: "navbar",
      orientation: " vertical",
      div: "box",
      argv: {
          title:"",
          menu:[],
          link:[]
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.elementInfo.asset !== "null") {
            return {
                title: nextProps.elementInfo.argv.title,
                menu: nextProps.elementInfo.argv.menu,
                link: nextProps.elementInfo.argv.link,
                chipData: nextProps.elementInfo.argv.menu,
                chipLink: nextProps.elementInfo.argv.link,
            }
        }
        return null;
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

    AddMenu = ()=>{
        let data = this.state.menuValue
        this.setState({
            chipData : this.state.chipData.concat({
                key : this.menuKey++,
                label : data
            }),
            menu : this.state.menu.concat(data)
        })
        console.log("chipdata",this.state.chipData)
    }

    AddLink =()=>{
        let data = this.state.linkValue
        this.setState({
            chipLink : this.state.chipLink.concat({
                key : this.linkKey++,
                label : data
            }),
           link : this.state.link.concat(data)
        })
        console.log("chiplink",this.state.chiplink)
    }

    handleMenuDelete = (data)=>{
        const chipToDelete = this.state.chipData.indexOf(data);
        this.setState({
            chipData : this.state.chipData.filter(data => data.key !== chipToDelete.key),
            chipLink : this.state.chipLink.filter(data=>data.key!==chipToDelete.key)
        })
    }

    handleLinkDelete =(data)=>{
        const chipToDelete = this.state.chipLink.indexOf(data);
        this.setState({
            chipData : this.state.chipData.filter(data=>data.key!== chipToDelete.key),
            chipLink : this.state.chipLink.filter(data=>data.key!==chipToDelete.key)
        })
    }

    render(){
        const classes = useStyles;
        
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
                    {this.state.chipData.map(data => {
                        let icon = null;
                        return (
                        <Chip
                            key={data.key}
                            label={data.label}
                            onDelete={()=>this.handleDelete(data)}
                            className={classes.chip}
                        />
                        );
                    })}
                </Paper>
                <TextField
                    id="standard-textarea"
                    label="link"
                    placeholder="Add multiple link!"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    name="linkValue"
                    value={this.state.linkValue}
                />
                <Fab color="primary" 
                     aria-label="Add" 
                     className={classes.fab}
                     style ={{bottom: "-20px"}}
                     size='small'
                     name = "link"
                     onClick = {() => this.AddLink()}>
                    <AddIcon />
                </Fab>
                <Paper className={classes.root}>
                    {this.state.chipLink.map(data => {
                        let icon = null;
                        return (
                        <Chip
                            key={data.key}
                            label={data.label}
                            onDelete={()=>this.handleDelete(data)}
                            className={classes.chip}
                        />
                        );
                    })}
                </Paper>
                <Button variant="contained" 
                    size="small" 
                    className={classes.button}
                    type = "submit"
                    style ={{bottom: "-20px"}}>
                    { this.state.editing ? 'apply' : 'change'}
                </Button>
            </form>
        )
    }
}

export default NavBar;