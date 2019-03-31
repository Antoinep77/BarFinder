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
        }).catch(console.log)

        this.props.socket.on('msg', msg => {
            var messages = this.state.messages;
            messages.push(msg);
            this.setState({ messages })
        });

        this.props.socket.on('score', scores => {
            console.log("scores!")
            this.setState({ scores })
        })
        this.onMessageSend = this.onMessageSend.bind(this)

    }
    componentDidUpdate() {
        let objDiv = document.getElementById("Chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    onMessageSend = message => {
        let newMessage = {
            text: message,
            member: this.props.user,
            date: new Date()
        }
        this.props.socket.emit('msg', newMessage)
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
                        <h5>4000 coins</h5>
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
                                    <td>{ind}</td>
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