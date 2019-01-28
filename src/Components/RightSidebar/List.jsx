import React, {Component} from 'react'

class List extends Component{

    state ={
        class:"",
        string:"",
        href:"", 
        editing : true,          
    }

    element = {
        asset : "list",
        orientation : "vertical",
        div : 'box1',
        argv: {
            count:"",
            menu:[],
            link:[],   
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
                    name ="count"
                    placeholder ="count"
                    onChange ={this.handleChange}
                    value ={this.state.class}
                />
                <input
                    name = "link"
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

export default List;