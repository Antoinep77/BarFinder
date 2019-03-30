import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }
    onChange = e => {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <div className="Login">
            <h1>Welcome to the chat !</h1> 
            <h2>Please enter your username :</h2>
            <form onSubmit={e => this.onSubmit(e)}>
            
                <input
                    onChange={e => this.onChange(e)}
                    value={this.state.username}
                    type="text"
                    autoFocus={true}
                />
                <button>Send</button>
            </form>
            </div>
        );
    }
}

export default Login;