import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: undefined
    }
  }
  onSubmit = user => {
    this.setState({
      user: {
        username: user
      }
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header">
            <h1>My Chat App</h1>
          </div>
        </header>
        {this.state.user ? <Chat user={this.state.user} /> : <Login onSubmit={this.onSubmit} />}
      </div>
    );
  }
}

export default App;
