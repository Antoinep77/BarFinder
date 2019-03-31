import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://192.168.43.88:5000');
    this.state = {
      user: undefined,
      animal : undefined,
      mission : undefined
    }
    this.socket.on('mission', mission=>{this.setState({mission})});
    this.socket.on('mission_complete', m=>{toast(m.mission.username+" a casé le mot : " + m.mission.word+"!")});
    this.socket.on('mission_blocked', m=>{toast(m.user+" a blocké le mot : " + m.mission.word+"!")});
    this.socket.on('mission_blocked_failed', m=>{toast(m.user+" a échoué lamentablement!")});
  }
  onSubmit = (user,animal) => {
    this.setState({
      user: {
        username: user,
        animal: animal
      }
    });
    this.socket.emit('join', user);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header">
            <h1>Miel Cimetière et Tradition</h1>
          </div>
        </header>
        {this.state.user ? <Chat user={this.state.user} mission={this.state.mission} socket={this.socket}/> : <Login onSubmit={this.onSubmit} />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
