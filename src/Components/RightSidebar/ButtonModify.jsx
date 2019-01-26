import React, { Component } from 'react';
import ButtonForm from'./ButtonForm';
import TitleBar from './TitleBar';
import axios from 'axios';

class ButtonModify extends Component {
  state = {
    component: "null",
    elements : []
  }

  postElement = async (element) => {
    const _this = this;
    const{elements} = this.state;
    const url = "http://143.248.38.50/editor/123456/assets";
    let getid;
    
    axios({
      method :'post',
      url : url,
      data : element
      }).then( await function(response){
        getid = response.data['asset_id']
        console.log("id post로 받은거",getid);
        _this.setState({
          elements : elements.concat({id : getid, ...element})
        })
        console.log(elements);
      })
      .catch(function(error){
        console.log(error);
      })

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
    console.log(component)

    let showBox;
      if(component === 'Button'){
        showBox= (<ButtonForm onCreate ={this.postElement}/>)
      }
      else if(component === 'TitleBar'){
        showBox =(<TitleBar/>)
      }
      else if(component === "NavBar"){

      }
      else if(component === "List"){

      }
      else if(component === " Billboard"){

      }
      else if(component === "Card"){
        
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