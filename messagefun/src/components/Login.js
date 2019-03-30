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
            <form onSubmit={e => this.onSubmit(e)}>
                <h1>Welcome to the chat, please enter your username</h1>
                <input
                    onChange={e => this.onChange(e)}
                    value={this.state.username}
                    type="text"
                    autoFocus={true}
                />
                <button>Send</button>
            </form>
        );
    }
}

export default Login;