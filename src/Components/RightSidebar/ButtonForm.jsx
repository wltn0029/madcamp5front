import React, {Component} from 'react'

class ButtonForm extends Component{

    state ={
        element : {
            asset : "button",
            orientation : "vertical",
            div : 1,
            argv: {
                class:"",
                string:"",
                href:"",   
            },  
        },
        editing : true          
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.editing){
            this.props.onCreate(this.state.element)
            this.setState({
                argv : {
                    class:"",
                    string:"",
                    href:"",
                }
            })
        }
        this.setState({
            editing:!this.state.editing
        })
    }

    render(){
        let{editing} = this.props;
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

export default ButtonForm;