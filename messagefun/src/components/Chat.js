import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import axios from "axios";

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            scores: []
        }

        axios.get('http://192.168.43.88:4000/messages').then(m => {
            this.setState({ messages: m.data });
            let objDiv = document.getElementById("Chat");
            objDiv.scrollTop = objDiv.scrollHeight;
        }).catch(console.log)

        this.props.socket.on('msg', msg => {
            var messages = this.state.messages;
            messages.push(msg);
            let objDiv = document.getElementById("Chat");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.setState({ messages });
        });

        this.props.socket.on('score', scores => {
            console.log("scores!")
            this.setState({ scores })
        })
        this.props.socket.on('update_message', m => {
            console.log(m);
            this.setState({messages: this.state.messages.map(msg => msg._id ===m._id ? m : msg)})
          })
        this.onMessageSend = this.onMessageSend.bind(this)

    }

    onMessageSend = message => {
        let newMessage = {
            text: message,
            member: this.props.user,
            date: new Date()
        }
        this.props.socket.emit('msg', newMessage);
    }
    scrollToBottom() {
        var objDiv = document.getElementById("Chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    onReact = (_id, reaction) => {
        this.props.socket.emit('reaction', { _id, reaction, user: this.props.user.username });
    }

    render() {
        let mission = this.props.mission ?
            <div className="mission">
                <h4>Mission</h4>
                <p>Casez le mot : {this.props.mission.word}</p>
            </div> : "No mission";
        let score = 0;
        console.log(this.state.scores);
        this.state.scores.forEach(user => score = user.username === this.props.user.username ? user.score : score);
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-10">
                        <div className="Chat" id="Chat">
                            <Messages currentMember={this.props.user} messages={this.state.messages} onReact={this.onReact} />
                        </div>
                        <Input onMessageSend={this.onMessageSend} />
                    </div>

                    <div class="col-2 coins">
                        <h5>{score} coins</h5>
                        <img src='coins.svg'></img>
                        <div class="mission">{mission}</div>
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th>rank</th>
                                    <th>username</th>
                                    <th>score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.scores.map((user, ind) =>
                                    <tr>
                                        <td>{ind + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.score}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>
        )
    }
}
export default Chat;