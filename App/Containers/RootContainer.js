// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification-ce';

// Dependencies
import ReduxNavigation from '../Navigation/ReduxNavigation';

// Styles
import styles from './Styles/RootContainerStyles';
import Colors from '../Themes/Colors';

class RootContainer extends Component {
  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.tron.log({ token });
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        console.tron.log({ notification });
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      // senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });

    PushNotification.appStart();
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor={Colors.gray}
        />
        <ReduxNavigation />
      </View>
    );
  }
}

export default connect()(RootContainer);
