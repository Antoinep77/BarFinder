import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:5000');
        this.state = {
            messages: []
        }

        this.socket.on('msg',msg =>{
            var messages = this.state.messages;
            messages.push(msg);
            this.setState({messages})
        });
        this.onMessageSend = this.onMessageSend.bind(this)

    }

    onMessageSend = message =>{
        let newMessage = {
            id:this.state.messages.length+1,
            text:message,
            member:this.props.user
        }
        this.socket.emit('msg',newMessage)
        //this.setState(prevState => ({
       //     messages : [...prevState.messages, newMessage]
    //    }))
    }

    render() {
        return (
        <div id="chat">
            <Messages currentMember={this.props.user} messages={this.state.messages}/>
            <Input onMessageSend={this.onMessageSend}/>
        </div>
        )
    }
}

export default Chat;