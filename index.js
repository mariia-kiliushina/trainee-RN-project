/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async () => {
  //do sth with remoteMessage
});

AppRegistry.registerComponent(appName, () => App);
