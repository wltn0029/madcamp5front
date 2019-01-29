import React, {Component} from 'react'

class Progress extends Component{

    state ={
        class:"",
        string:"",
        href:"", 
        editing : true,          
    }

    makeJSon(){
        element:{}
    }

    makeJson = () => {
        this.element.argv.class = this.state.class;
        this.element.argv.string = this.state.string;
    }

    element = {
        asset : "progress",
        orientation : "vertical",
        div : 'box',
        argv: {
            percentage:"",
        } 
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.element.argv.class = this.state.class;
        this.element.argv.string = this.state.string;
        this.element.argv.href = this.state.href;
        console.log(this.element)
        if(this.state.editing){
            this.props.onCreate(this.element)
        }
        this.setState({
            editing:!this.state.editing
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    name ="class"
                    placeholder ="color"
                    onChange ={this.handleChange}
                    value ={this.state.class}
                />
                {/* <input
                    name = "type"
                    placeholder = "type"
                    onChange = {this.handleChange}
                    value = {this.state.type}
                /> */}
                <input
                    name = "string"
                    placeholder ="name"
                    onChange ={this.handleChange}
                    value={this.state.string}
                />
                <input
                    name ="href"
                    placeholder ="site link"
                    onChange ={this.handleChange}
                    value={this.state.href}
                />
                <button 
                    style={{position: "absolute", bottom: "0", right: "0"}}
                    type ="submit">
                    {this.state.editing? 'Apply':'Change'}
                </button>
            </form>
        )
    }
}

export default Progress;