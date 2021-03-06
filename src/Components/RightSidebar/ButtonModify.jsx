import React, { Component } from "react";

import ButtonForm from "./ButtonForm";
import TitleBar from "./TitleBar";
import NavBar from "./NavBar";
import Progress from "./Progress";
import Card from "./Card";
import List from "./List";
import Billboard from "./BillBoard";
import NormalText from "./NormalText";
import ResponsiveImage from "./ResponsiveImage";
import YoutubeVideo from "./YoutubeVideo";

import axios from "axios";

class ButtonModify extends Component {
  state = {
    component: "null",
    elements: [],
    isModifying: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.clickedComponent !== prevState.component ||
      nextProps.isModifying !== prevState.isModifying
    ) {
      return {
        component: nextProps.clickedComponent,
        isModifying: nextProps.isModifying
      };
    }
    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  }

  render() {
    const { component } = this.state;
    const { onUpdate, elementInfo, isModifying,deleteElement,clickedBox } = this.props;
    console.log(component);

    let showBox;
    if (component === "Button") {
      showBox = <ButtonForm updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo} deleteElement = {deleteElement} clickedBox ={clickedBox} />;
    } else if (component === "TitleBar") {
      showBox = <TitleBar  updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo} clickedBox ={clickedBox} />;
    } else if (component === "NavBar") {
      showBox = <NavBar  updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo}clickedBox ={clickedBox}  />;
    } else if (component === "List") {
      showBox = <List  updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo}clickedBox ={clickedBox}  />;
    } else if (component === "Billboard") {
      showBox = <Billboard updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo} clickedBox ={clickedBox} />;
    } else if (component === "Card") {
      showBox = <Card updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo}clickedBox ={clickedBox}  />;
    } else if (component === "NormalText") {
      showBox = <NormalText updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo}clickedBox ={clickedBox}  />;
    } else if (component === "ResponsiveImage") {
      showBox = (
        <ResponsiveImage updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo} clickedBox ={clickedBox} />
      );
    } else if (component === "YoutubeVideo") {
      showBox = <YoutubeVideo updateElement={this.props.updateElement} isModifying={this.state.isModifying} onCreate={onUpdate} elementInfo={elementInfo} clickedBox ={clickedBox} />;
    } else {
      showBox = <div>choose any button you want!</div>;
    }
    return <div>{showBox}</div>;
  }
}

export default ButtonModify;
