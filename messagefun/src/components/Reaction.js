import React, { Component } from 'react';

class Reaction extends Component {
    constructor(props){
        super(props)
    }
    render(){
        if(this.props.active){
            return <div>Wesh</div>
        }else{
            return ""
        }
    }
}

export default Reaction