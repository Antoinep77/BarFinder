import React, { Component } from 'react';

class Reaction extends Component {
    onClick = e => {
        console.log(e.target);
        this.props.hide();
    }
    render() {
        if (this.props.active) {
            return <ul className="reaction">
                <li><a name="nope" onClick={this.onClick}>❌</a></li>
                <li><a name="funny" onClick={this.onClick}>😂</a></li>
                <li><a name="confused" onClick={this.onClick}>🤔</a></li>
            </ul>
        } else {
            return ""
        }
    }
}

export default Reaction