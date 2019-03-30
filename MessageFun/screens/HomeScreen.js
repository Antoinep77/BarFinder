import React from 'react';
import io from 'socket.io-client';
import axios from 'axios'

import {
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Button
} from 'react-native';
import { joinRoom,} from '../service/userservice';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = { username : undefined}
    this.socket = io('http://localhost:5000')
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(message){

    this.socket.emit('message',{message});s
    this.socket.on('msg', data => console.log(data) )
}

  render() {
    return (
      <View style={styles.container}>
      <View   style={styles.inputBox}>
        <Text>
          Welcome to the chat, please choose your username.
        </Text>
        <TextInput
              placeholder="Type here to translate!"
              onChangeText={(username) => this.setState({username})}
            />
          <Button
            onPress={() => {
              this.sendMessage(this.state.username)
            }}
            title="Press Me"
          />
      </View>

    
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBox: {
    textAlign: "center",
    flex:1
  }
});
