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
            <div class='container'>
                <div class='row'>
                    <div class="col-10">
                        <div class="Chat" id="Chat">
                        <Messages currentMember={this.props.user} messages={this.state.messages} />
                        </div>
                        <Input onMessageSend={this.onMessageSend} />
                    </div>

                    <div class="col-2 coins">
                        <h5>4000 coins</h5>
                        <img src='coins.svg'></img>
                    </div>
                
                </div>
                
                
            </div>
            
        )
    }
}

export default Chat;