import { Component } from "react";
import React from "react";

class Messages extends Component {
    renderMessage(message) {
        const { id, member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className} key={id} >
                <span
                    className="avatar"
                    style={{ backgroundColor: "blue" }}
                />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }
}

export default Messages;