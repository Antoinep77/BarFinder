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
            ]
        }
    }

    onMessageSend = message =>{
        let newMessage = {
            id:this.state.messages.length+1,
            text:message,
            member:this.props.user
        }
        this.setState(prevState => ({
            messages : [...prevState.messages, newMessage]
        }))
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