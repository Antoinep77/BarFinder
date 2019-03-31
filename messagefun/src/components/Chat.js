import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import io from 'socket.io-client';
import axios from "axios";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.socket = io('http://192.168.43.173:5000');
        this.state = {
            messages: []
        }

        axios.get('http://192.168.43.173:4000/messages').then(m => {
            this.setState({messages:m.data});
    }).catch(console.log)

        this.socket.on('msg', msg => {
            var messages = this.state.messages;
            messages.push(msg);
            this.setState({ messages })
        });
        this.onMessageSend = this.onMessageSend.bind(this)

    }
    componentDidUpdate(){
        let objDiv = document.getElementById("Chat");
        objDiv.scrollTop = objDiv.scrollHeight;
        console.log( objDiv.scrollHeight)
    }
    onMessageSend = message => {
        let newMessage = {
            text: message,
            member: this.props.user,
            date: new Date()
        }
        this.socket.emit('msg', newMessage)
    }
    scrollToBottom() {
        var objDiv = document.getElementById("Chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    chooseReaction(id){
        console.log(id);
    }
    
    render() {
        return (
            <div class="Chat" id="Chat">
                <Messages chooseReaction={this.chooseReaction} currentMember={this.props.user} messages={this.state.messages} />
                <Input onMessageSend={this.onMessageSend} />
            </div>
        )
    }
}

export default Chat;