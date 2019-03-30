import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
                {
                    id:1,
                    text: "Hi clément",
                    member: {
                        username: "badrdr"
                    }
                },
                {
                    id:2,
                    text: "Hi Badr !",
                    member: {
                        username: "clemclem"
                    }
                }
            ],
            member: {
                username: "badrdr"
            }
        }
    }

    onMessageSend = message =>{
        let newMessage = {
            id:this.state.messages.length+1,
            text:message,
            member:this.state.member
        }
        this.setState(prevState => ({
            messages : [...prevState.messages, newMessage]
        }))
    }

    render() {
        return (
        <div id="chat">
            <Messages currentMember={this.state.member} messages={this.state.messages}/>
            <Input onMessageSend={this.onMessageSend}/>
        </div>
        )
    }
}

export default Chat;