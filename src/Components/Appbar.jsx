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
import CardIcon from "@material-ui/icons/PhotoAlbum";
import TextIcon from "@material-ui/icons/Title";
import PhotoIcon from "@material-ui/icons/InsertPhoto";
import YoutubeIcon from "@material-ui/icons/LocalMovies";
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ButtonModify from './RightSidebar/ButtonModify';
import { Button } from "@material-ui/core";
import Center from '../Components/Dnd/Center';


import axios from 'axios';
import Highlight from 'react-highlight.js';

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
let Buttons = [(<ButtonIcon />), (<TitleIcon />), (<NavbarIcon />), (<ListIcon />), (<BillboardIcon />), (<CardIcon />),(<TextIcon />),(<PhotoIcon />), (<YoutubeIcon />)];
class ClippedDrawer extends React.Component {
  state = {
    isModifying: false,
    justCheck: true,
    open: true,
    clickedComponent : '',
    selectedElement: {asset: "null"},
    clickedBox:'',
    boxDirection:'',
    clickedDivision : '',
    load:false,
    elements : [    ],
    boxes : [
        {
          name : "box",
          height : "500px",
          width : "1200px",          
          elements :[ ]
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
}
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
    
    let splitUrl = "http://143.248.38.50/editor/654321/";
    splitUrl = splitUrl+'division/'+boxId;

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

    newElements = newElements.map(element => {
      if(element.div === boxId){
        element.div = boxId+1
        return element
      }
      return element
    })
    console.log('appbar split element',newElements)
    newBoxes = beforeBox.concat(afterBox)
    console.log("new boxes",newBoxes)
    
    let newBox = newBoxes.find(box =>{
      return box.name === boxId +1
    })
    console.log("tuype new box",typeof newBox)
    // newElements.map(element=>{
    //   newBox = newBox.elements.push(element)
    //   console.log('newbox>>>>>>>>>>>>>>>>>>>>>>>>',newBox)
    // })
    /**
     * newBoxes =  _this.state.boxes.map(box =>{
            if(box.name == element.div){
              box.elements.push(element)
              return box;
            }
          }
     */
    newElements.map(element=>{
      console.log("new elements",element)
      newBoxes = newBoxes.map(box=>{
        if(box.name === element.div){
          box.elements.push(element)
          return box
        }
        return box
      })
      return element
    })
    console.log("new boxes",newBoxes)
    this.setState({
        boxDirection : direction,
        boxes : newBoxes,
        elements : newElements,
        boxArray : newBoxArray,
    })
    //post 
    axios({
      method :'post',
      url : splitUrl,
      data : {
        "orientation" : direction
      }
    })
  }

  elementMove = (element, id) => {
    let updateUrl ="http://143.248.38.50/editor/654321/"
    updateUrl = updateUrl+element.id
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
    axios({
      method :'patch',
      url : updateUrl,
      data : project
    })
  };

  boxClicked=(boxId)=>{
    console.log("appbar>>>>>>>",boxId)  
    this.setState({
      clickedBox : boxId
    })
  }

  updateElement = (newElement) =>{
    let updateUrl = "http://143.248.38.50/editor/654321/"
    updateUrl = updateUrl+newElement.id
    let oldElement = this.state.selectedElement;
    if(newElement !== oldElement && newElement.id === oldElement.id){
      //first, update elements
      let newElements = this.state.elements
      newElements = newElements.filter(element => element.id !== newElement.id)
      newElements = newElements.concat(newElement)
      //then update boxes
      let newBoxes = this.state.boxes;
      newBoxes = newBoxes.map(box =>{
        if(box.name === newElement.div){
          box.elements = box.elements.filter(element=>element.id !== newElement.id)
          box.elements.concat(newElement)
          return box
        }
      })
      //and then setstate
      this.setState({
        elements : newElements,
        boxes : newBoxes
      })
      //patch it to server
      axios({
        method :'patch',
        url : updateUrl,
        data : newElement
      })
    }
  }

  deleteElement =(element)=>{
    let deleteUrl = "http://143.248.38.50/editor/654321/"
    deleteUrl= deleteUrl+"assets/"+element.id
    //first delete element 
    let newElements = this.state.elements;
    newElements.filter(element => element.id !== element.id)
    //then delete element in boxes
    let newBoxes = this.state.boxes;
    newBoxes = newBoxes.map(box=>{
      if(box.name === element.div){
        box.elements = box.elements.filter(element=>element.id !== element.id)
        return box;
      }
    })
    //set state
    this.setState({
      elements : newElements,
      boxes : newBoxes
    })
    //delete it to server
    axios({
      method : 'delete',
      url : deleteUrl,
      data: element
    })
  }

  onUpdate = element => {
    console.log("#######################3", element);
    const _this = this;
    const url = "http://143.248.38.50/editor/232323/assets";
    let getid;
    let postUrl = "http://143.248.38.50/editor/654321/";
    //division id 어떤 형식으로 줘야하는 지 물어보기!!
    postUrl = postUrl+element.div+"/assets";
    console.log(JSON.stringify(element));
    axios({
      method :'post',
      url : postUrl,
      data : element
      }).then(function(response){
        getid = response.headers['asset_id'];
        resbody = response.data;
        console.log(resbody);
        console.log("id post로 받은거",getid);
        let newElements = _this.state.elements;
        let newBoxes = _this.state.boxes;
        newElements = _this.state.elements.concat({id : getid, ...element})
        newBoxes =  _this.state.boxes.map(box =>{
            if(box.name == element.div){
              box.elements.push(element)
              return box;
            }
            return box;
          }, console.log("onupdate state check",newElements))
          console.log("onupdate state check",newElements)
        _this.setState({
          elements : newElements,
          boxes : newBoxes
        })
        console.log("onupdate box state",_this.state.boxes)
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
              Spider
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
          <p>{this.state.clickedBox}</p>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Center elements ={this.state.elements}
                  elementMove = {this.elementMove}
                  boxes={this.state.boxes}
                  elementClick={this.elementClick}
                  splitBox = {this.splitBox}
                  boxClicked = {this.boxClicked}
                  boxArray = {this.state.boxArray}
                  />
                  <iframe
                    srcDoc={resbody}
                    style={{border: "solid 3px #1d4687", width: "1370px", height: "770px"}}
                  ></iframe>
                  <div
                    style={{border: "solid 3px #1d4687", width: "1370px"} }
                    >
                    <Highlight language={"html"} >{resbody}</Highlight>
                    </div>
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
            deleteElement ={this.deleteElement}
            elementMove = {this.elementMove}
            elementInfo={this.state.selectedElement}
            isModifying={this.state.isModifying}
            updateElement={this.updateElement}
            clickedBox ={this.state.clickedBox}/>
        </Drawer>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
