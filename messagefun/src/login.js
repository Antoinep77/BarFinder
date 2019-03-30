import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: undefined
        }
    }

  render() {
    return (<div>
              <div>Welcome to the chat, please enter your username</div>
              <input value={this.state.username} onChange={event => this.setState({username:event.target.value})}/>
              <button onSubmit = {()=>this.props.onSubmit(this.state.username)}>Validate</button>
    </div>
);
  }
}

export default App;