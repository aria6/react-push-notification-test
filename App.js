import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import {pushNotifications} from './src/services';

import PushNotificationIOS from 'react-native';
import PubNubReact from 'pubnub-react';
var PushNotification = require('react-native-push-notification');

// pushNotifications.configure();

export default class App extends React.Component {
  constructor() {
    super(...arguments);
    this.pubnub = new PubNubReact({
      publishKey: 'publishKey',
      subscribeKey: 'subscribeKey',
    });
    this.pubnub.init(this);
    PushNotification.configure({
      // Called when Token is generated.
      onRegister: function(token) {
        console.log('TOKEN:', token);
        if (token.os == 'ios') {
          this.pubnub.push.addChannels({
            channels: ['Channel-wopctb1pg'],
            device: token.token,
            pushGateway: 'apns',
          });
          // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
        } else if (token.os == 'android') {
          this.pubnub.push.addChannels({
            channels: ['Channel-wopctb1pg'],
            device: token.token,
            pushGateway: 'gcm', // apns, gcm, mpns
          });
          // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
        }
      }.bind(this),
      // Something not working?
      // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
      // Called when a remote or local notification is opened or received.
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        // Do something with the notification.
        // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID: GCM or FCM Sender ID
      senderID: '324601078795',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title={'Press Me'} onPress={this._handleOnPress} />
      </View>
    );
  }

  _handleOnPress = () => {
    // pushNotifications.localNotification();
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
