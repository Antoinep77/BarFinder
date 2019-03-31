import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: undefined,
      mission:undefined
    }
  }

  onSubmit = user => {
    this.setState({
      user: {
        username: user
      }
    });
    axios.get('http://192.168.43.173:4000/missions/'+user).then(mission=>{console.log(mission);this.setState({mission})})
    .catch(console.log)
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
