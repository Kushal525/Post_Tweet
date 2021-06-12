import Axios from 'axios';
import React, {Component} from 'react';

class ClassExample extends Component {
    // componentDidMount(){
    //     Axios.get('https://api.github.com/users').then((response)=>{
    //         console.log(response)
    //     })
    // }
    state={
        github : "https://github.com/kushal525",
        users : [],
        loading : false,
        inputText : ''
    }

    async componentDidMount(){
        this.setState({loading: true});
        const res = await Axios.get('https://api.github.com/users')
        console.log(res.data)
        this.setState({users : res.data, loading: false})
    }

    onSubmit = (e) => {
        console.log(this.state.inputText)
    }
    
    
     static defaultProps ={
        name:"Kushal"
    }
    render(){
        const github = this.state.github;
        const a = [1,2,3,4,5,6]
        
        if(this.state.loading){
            return(
                <h1>Loading</h1>
            )
        }else{
            return(
                <div style={github_style}>
                    <input 
                    type="text"
                    onChange={(e) => this.setState({inputText: e.target.value})}
                    />
                    <button name="submit" onClick={this.onSubmit}>Submit</button>
                    {this.state.inputText}
                    <h1>Hello {this.props.name}</h1>
                    <a href={github}>Kushal</a>
                    {this.state.users.map((val)=>{
                        return(
                            <div>
                                <h1>{val.id}</h1>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}
const github_style = {
    color:'Cyan'
}

export default ClassExample;