import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import axios from "axios";

class Chat extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            messages: []
        }

        axios.get('http://192.168.43.173:4000/messages').then(m => {
            this.setState({ messages: m.data });
        }).catch(console.log)

        this.props.socket.on('msg', msg => {
            var messages = this.state.messages;
            messages.push(msg);
            this.setState({ messages })
        });
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
        this.props.socket.emit('reaction', {_id,reaction});
    }

    render() {
        let mission = this.props.mission ? 
        <div className="mission">
            <h3>Mission</h3>
            <p>Casez le mot : {this.props.mission.word}</p>
        </div> : "No mission";
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-10">
                        <div className="Chat" id="Chat">
                            <Messages currentMember={this.props.user} messages={this.state.messages} onReact={this.onReact}/>
                        </div>
                        <Input onMessageSend={this.onMessageSend} />
                    </div>

                    <div class="col-2 coins">
                        <h5>4000 coins</h5>
                        <img src='coins.svg'></img>
                        {mission}
                    </div>

                </div>


            </div>

        )
    }
}

export default Chat;