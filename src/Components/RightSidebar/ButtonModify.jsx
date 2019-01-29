import React, { Component } from 'react';

import ButtonForm from'./ButtonForm';
import TitleBar from './TitleBar';
import NavBar from './NavBar';
import Progress from './Progress';
import Card from './Card';
import List from './List';
import Billboard from './BillBoard';
import NormalText from './NormalText';
import ResponsiveImage from './ResponsiveImage';
import YoutubeVideo from './YoutubeVideo';

import axios from 'axios';

class ButtonModify extends Component {
  state = {
    component: "null",
    elements : []
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    // 여기서는 setState 를 하는 것이 아니라
    // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
    // 사용됩니다.
    if (nextProps.clickedComponent !== prevState.component) {
      return { component: nextProps.clickedComponent };
    }
    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  }

  render() {
    const {component} = this.state;
    const{onUpdate} = this.props;
    console.log(component)

    let showBox;
      if(component === 'Button'){
        showBox= (<ButtonForm onCreate ={onUpdate}/>)
      }
      else if(component === 'TitleBar'){
        showBox =(<TitleBar onCreate = {onUpdate}/>)
      }
      else if(component === "NavBar"){
        showBox = (<NavBar onCreate = {onUpdate}/>)
      }
      else if(component === "List"){
        showBox = (<List onCreate = {onUpdate}/>)
      }
      else if(component === "Billboard"){
        showBox = (<Billboard onCreate ={onUpdate}/>)
      }
      else if(component === "Card"){
        showBox = (<Card onCreate ={onUpdate}/>)
      }
      else if(component === "NormalText"){
        showBox = (<NormalText onCreate ={onUpdate}/>)
      }
      else if(component === "ResponsiveImage"){
        showBox = (<ResponsiveImage onCreate ={onUpdate}/>)
      }
      else if(component === "YoutubeVideo"){
        showBox = (<YoutubeVideo onCreate ={onUpdate}/>)
      }
      else{
        showBox =(<div>choose any button you want!</div>)
      }
      return(
        <div>
          {showBox}
        </div>
      )
  }
}

export default ButtonModify;