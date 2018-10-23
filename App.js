import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {pushNotifications} from './src/services';

pushNotifications.configure();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title={'Press Me'} onPress={this._handleOnPress} />
      </View>
    );
  }

  _handleOnPress = () => {
    pushNotifications.localNotification();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
