import React, { Component } from 'react';

class ReactionCount extends Component {
    onClick = e => {
        this.props.onReact(e.target.name);
        this.props.hide();
    }
    render() {
        let result = [];
        if (this.props.message.nope.length > 0) {
            result.push(<span key="1">❌{this.props.message.nope.length}</span>)
        }
        if (this.props.message.funny.length > 0) {
            result.push(<span key="2">😂{this.props.message.funny.length}</span>)
        }
        if (this.props.message.confused.length > 0) {
            result.push(<span key="3">🤔{this.props.message.confused.length}</span>)
        }
        
        return <div class="reactionCount">{result}</div>
    }
}

export default ReactionCount