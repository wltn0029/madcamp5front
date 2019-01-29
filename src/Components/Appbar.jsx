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
import ButtonIcon from "@material-ui/icons/RadioButtonChecked";
import TitleIcon from "@material-ui/icons/FeaturedPlayList";
import NavbarIcon from "@material-ui/icons/Navigation";
import ListIcon from "@material-ui/icons/ViewList";
import BillboardIcon from "@material-ui/icons/Panorama";
import CardIcon from "@material-ui/icons/PhotoAlbum"




import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ButtonModify from './RightSidebar/ButtonModify';
import { Button } from "@material-ui/core";
import Center from '../Components/Dnd/Center';
import CardIcon from "@material-ui/icons/PhotoAlbum";

import ButtonModify from './RightSidebar/ButtonModify';
import { Button } from "@material-ui/core";
import Center from './Dnd/Center';

import axios from 'axios';
// import DropTarget from '../DnD/DropTarget';
//require('prismjs');
//require('prismjs/themes/prism.css');
import Prism from "prismjs";
import "./prism.css";
const drawerWidth = 240;
const initialHeight = "500px"
const initialWidth = "1200px"

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
let resbody;
var prismCode;
let Buttons = [(<ButtonIcon />), (<TitleIcon />), (<NavbarIcon />), (<ListIcon />), (<BillboardIcon />), (<CardIcon />)];
let check = false; 
class ClippedDrawer extends React.Component {
  state = {
    isModifying: false,
    justCheck: true,
    open: true,
    clickedComponent : '',
    selectedElement: {asset: "null"},
    clickedBox:'',
    boxDirection:'',
    load:false,
    elements : [{
        asset: "button",
        orientation: " vertical",
        div: "box",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn1"
        }
      },
      {
        asset: "button",
        orientation: " vertical",
        div: "box",
        argv: {
          class: "btn btn-primary",
          href: "",
          string: "btn2"
        }
      }
    ],
      boxes : [
        {
          name : "box",
          height : "500px",
          width : "1200px",          
          elements :[
            {
              asset: "button",
              orientation: " vertical",
              div: "box",
              argv: {
                class: "btn btn-primary",
                href: "",
                string: "btn1"
              }
            },
            {
              asset: "button",
              orientation: " vertical",
              div: "box",
              argv: {
                class: "btn btn-primary",
                href: "",
                string: "btn2"
              }
            }
          ]
        },
      ],
      boxArray : [{name : 'box',orientation : null}],
  };

  btnClick =  (component) => {
    this.setState({
      clickedComponent: component
    });
    console.log(component+" clicked")
    const tempObj = {asset: "null"}
    this.setState({
      selectedElement: tempObj,
      isModifying: false,
    });
    console.log("after clicked????????????", this.state.selectedElement);
  };

  clearBox = ()=>{
    this.setState({
      boxes : this.state.boxes.map(box=>{
        box.elements = []
        return box
      })
    })
  }

  elementClick = (element) => {
    let typeStr;
    console.log("ELEMENT!!!!!!!!!", element);
    if (element.asset === "button") {
      typeStr = "Button";
    } else if (element.asset === "navbar") {
      typeStr = "NavBar";
    } else if (element.asset === "list") {
      typeStr = "List";
    } else if (element.asset === "billboard") {
      typeStr = "Billboard";
    } else if (element.asset === "titlebar") {
      typeStr = "TitleBar";
    } else if (element.asset === "card") {
      typeStr = "Card";
    } else if (element.asset === "text") {
      typeStr = "NormalText";
    } else if (element.asset === "image") {
      typeStr = "ResponsiveImage";
    } else if (element.asset === "youtube") {
      typeStr = "YoutubeVideo"
    }
    this.setState({
      clickedComponent: typeStr,
      selectedElement: element,
      isModifying: true,
    });
  selectBox =(boxId)=>{
    this.setState({
      clickedBox : boxId,
    })
  }

  findBox =(box)=>{
    return box
  }

  splitBox =(direction)=>{
    let boxId = this.state.clickedBox;
    console.log("split boxId",boxId)
    let box = this.state.boxes.find(box=>{
        return (box.name === boxId)
    })
    console.log("***split box",box)
    let height = box.height;
    let width = box.width;
    let newBoxes = this.state.boxes.slice();
    let newElements = this.state.elements.slice();
    let newBoxArray = this.state.boxArray.slice();
    console.log("**when splitbox***",newElements)
    let curIndex = newBoxes.indexOf(box);
    let beforeBox = newBoxes.slice(0,curIndex);
    let afterBox = newBoxes.slice(curIndex+1,newBoxes.length);
    console.log("newBoxArray",newBoxArray)
    let indexBox = newBoxArray.find(box=>{
      console.log("box",box)
      if(box !== undefined) return (box.name === boxId)
    })
    let parentIndex = newBoxArray.indexOf(indexBox)
    newBoxArray[parentIndex].orientation = direction
    newBoxArray[parentIndex*2+1] = {name : boxId +1, orientation : null}
    newBoxArray[parentIndex*2+2]={name :boxId+2,orientation :null}
    //move elements beloning to original box to new box
    if(direction === "row"){
      width = parseFloat(width)/2+"px"
    }
    else if(direction === "column"){
      height = parseFloat(height)/2+'px'
    }
    beforeBox = beforeBox.concat({
      name : boxId +1,
      elements :[],
      width : width,
      height : height
    },{
      name :boxId +2,
      elements : [],
      height : height,
      width : width
    })

    newElements.map(element => {
      if(element.div === boxId){
        element.div = boxId+1
      }
    })

    newBoxes = beforeBox.concat(afterBox)
    // console.log("new elements",newElements)
    newElements.map(element=>{
      console.log("new elements",element)
      newBoxes.map(box=>{
        if(box.name === element.div){
          box.elements.push(element)
        }
      })
    })

    this.setState({
        boxDirection : direction,
        boxes : newBoxes,
        elements : newElements,
        boxArray : newBoxArray,
    })
  }

  elementMove = (element, id) => {
    console.log("finally came to parent component!", element, " id:", id);
    let project = this.state.elements.find(p => {
      return p.argv.string === element.argv.string;
    });
    project.div = id;
    this.clearBox();
    this.state.elements.map(element=>{
      this.state.boxes.map(box=>{
        if(box.name === element.div){
          box.elements.push(element);
        }
      })
    })
    console.log("elementMove elements>>>>>",this.state.elements)
    console.log("this.state2.element", this.state.elements);
  };

  boxClicked=(boxId)=>{
    console.log("appbar>>>>>>>",boxId)  
    this.setState({
      clickedBox : boxId
    })
  }

  onUpdate = element => {
    console.log("#######################3", element);
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
        resbody = response.data.toString().trim();
        console.log(resbody);
        console.log("id post로 받은거",getid);
        _this.setState({
          elements : _this.state.elements.concat({id : getid, ...element})
        })
        //update box per element
        _this.setState({
          boxes : _this.state.boxes.map(box =>{
            if(box.name == element.div){
              box.push(element)
              return box;
            }
          })
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
    console.log('appbar elements',this.state.elements)
    console.log(this.state.boxes)
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
            {["Button","TitleBar", "NavBar", "List","Billboard","Card","NormalText","ResponsiveImage","YoutubeVideo"].map((text, index) => (
              <ListItem button
                key={text}
                onClick ={()=>this.btnClick(text)}
                >
                <ListItemIcon>
                  {Buttons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button onClick={this.getLog}>GETLOG!</Button> 
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Center elements ={this.state.elements}
                  elementMove = {this.elementMove}
                  boxes={this.state.boxes}
                  elementClick={this.elementClick}/>
                  <iframe
                    srcDoc={resbody}
                    style={{border: "solid 3px #1d4687", width: "1370px", height: "770px"}}
                  ></iframe>
                  <div
                    style={{border: "solid 3px #1d4687", width: "1370px", height: "470px"} }
                    >
                    <pre><code class="language-html">{resbody}</code></pre>
                    </div>


                  splitBox = {this.splitBox}
                  boxClicked = {this.boxClicked}
                  boxArray = {this.state.boxArray}/>
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
            elementMove = {this.elementMove}
            elementInfo={this.state.selectedElement}
            isModifying={this.state.isModifying}/>
        </Drawer>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
