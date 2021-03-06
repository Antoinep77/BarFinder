import { Component } from "react";
import Reaction from "./Reaction";
import ReactionCount from "./ReactionCount";
import React from "react";

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reaction: false
        }
    }

    componentDidUpdate() {
        let objDiv = document.getElementById("Chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    showReaction = () => {
        this.setState({ reaction: !this.state.reaction })
    }

    hideReaction = () => {
        this.setState({ reaction: false })
    }


    render() {
        const { _id, member, text } = this.props.message;
        const { currentMember } = this.props;
        const messageFromMe = member.username === currentMember.username;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className} key={_id} >
                <span
                    className="avatar"
                    style={{ backgroundImage: 'url("logos/noun_Animal_'+member.animal+'.png")',
                                backgroundSize: '35px 35px'
                 }}
                />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text" onClick={this.showReaction}>{text}</div>
                    <Reaction active={this.state.reaction} hide={this.hideReaction} onReact={(reaction) => this.props.onReact(_id, reaction)}/>
                    <ReactionCount message={this.props.message}/>
                </div>
            </li>
        );
    }
}

export default Message;