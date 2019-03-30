import React from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

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
