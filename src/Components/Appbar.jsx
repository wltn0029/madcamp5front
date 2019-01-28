import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import ButtonModify from './RightSidebar/ButtonModify';
import { Button } from "@material-ui/core";
import Center from '../Components/Dnd/Center';

import axios from 'axios';

// import DropTarget from '../DnD/DropTarget';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginRight: 0
  },
  toolbar: theme.mixins.toolbar
});

let box1 = [];
let box2 = [];
let box3 = [];
let htmlSource = "";

class ClippedDrawer extends React.Component {

  state = {
    justCheck: true,
    open: true,
    clickedComponent : '',
    load:false,
    elements : [{
        asset: "button",
        orientation: " vertical",
        div: "box1",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn1"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box1",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn2"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box2",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn3"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box2",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn4"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box3",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn5"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box3",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn6"
        }
      }],
  };
 
  btnClick =  (component) => {
    this.setState({
      clickedComponent: component
    });
    console.log(component+" clicked")
  };

  elementMove = (element, id) => {
    console.log("finally came to parent component!", element, " id:", id);
    let project = this.state.elements.find(p => {
      return p.argv.string === element.argv.string;
    });
    project.div = id;
    const justcheck2 = this.state.justCheck;
    this.setState({
      justCheck: !justcheck2
    });
    console.log("this.state2.element", this.state.elements);
  };

  onUpdate = element => {
    const _this = this;
    const url = "http://143.248.38.50/editor/123456/assets";
    let getid;
    console.log(JSON.stringify(element));
    axios({
      method :'post',
      url : url,
      data : element
      }).then(function(response){
        getid = response.headers['asset_id'];

        console.log("id post로 받은거",getid);
        _this.setState({
          elements : _this.state.elements.concat({id : getid, ...element})
        })
      })
      .catch(function(error){
        console.log(error);
      })
  }

  setStateAsync(state){
    return new Promise((resolve)=>{
      this.setState(state, resolve)
    })
  }

  render() {
    console.log("appbar render")
    const { classes } = this.props;    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Clipped drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
           <List>
            {["Button","TitleBar", "NavBar", "List","Billboard","Card"].map((text, index) => (
              <ListItem button
                key={text}
                onClick ={()=>this.btnClick(text)}
                >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Inbox" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Center elements ={this.state.elements}
                  elementMove = {this.elementMove}/>
        </main>
            
        {/* Right Sidebar */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          {/* 선택한, 각각의 요소 변형할 수 있는 컴포넌트 */}
          <ButtonModify 
            clickedComponent ={this.state.clickedComponent}
            onUpdate = {this.onUpdate}
            elementMove = {this.elementMove}/>
        </Drawer>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
