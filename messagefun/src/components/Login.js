import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            animal:'1430104'

        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.username,this.state.animal);
    }
    onChange = e => {
        this.setState({ username: e.target.value });
    }

    onChangeRadio = e => {
        this.setState({ animal: e.target.value });
    }

    render() {
        return (
            <div className="Login">
            <h1>Welcome to the chat !</h1> 
            
            <form className="form-inline" onSubmit={e => this.onSubmit(e)}>
                
                <div className="form-group usernameLogin">
                <h2>Please enter your username :</h2>
                <input
                    onChange={e => this.onChange(e)}
                    value={this.state.username}
                    type="text"
                    autoFocus={true}
                />
                <button>Send</button>
                </div>
                <div class="form-check animals">
                    <label><input type="radio" name="1430104"/><img src='logos/noun_Animal_1430104.png'></img></label>
                    <label><input type="radio" value="1658831" onChange={e => this.onChangeRadio(e)} /><img src='logos/noun_Animal_1658831.png'></img></label>
                    <label><input type="radio" value="1658853" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1658853.png'></img></label>
                    <label><input type="radio" value="1951430" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951430.png'></img></label>
                    <label><input type="radio" value="1951432" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951432.png'></img></label>
                    <label><input type="radio" value="1951448" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951448.png'></img></label>
                    <label><input type="radio" value="1951449" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951449.png'></img></label>
                    <label><input type="radio" value="1951454" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951454.png'></img></label>
                    <label><input type="radio" value="1951456" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951456.png'></img></label>
                    <label><input type="radio" value="1951462" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951462.png'></img></label>
                    <label><input type="radio" value="1951466" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_1951466.png'></img></label>
                    <label><input type="radio" value="2355613" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Animal_2355613.png'></img></label>
                    <label><input type="radio" value="1046552" onChange={e => this.onChangeRadio(e)}/><img src='logos/noun_Beaver_1046552.png'></img></label>
                </div>
                
            </form>
            </div>
        );
    }
}

export default Login;