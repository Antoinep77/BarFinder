import React from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Button
} from 'react-native';
import { joinRoom,sendMessage} from '../service/userservice';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = { username : undefined}
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
              console.log("test")
              joinRoom(this.state.username);
              sendMessage("test")
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
