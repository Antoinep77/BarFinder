import { Component } from "react";
import Message from "./Message";
import Reaction from "./Reaction";
import React from "react";

class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map((m) => (<Message message={m} currentMember={this.props.currentMember} key={m._id}/>))}
            </ul>
        );
    }
}

export default Messages;