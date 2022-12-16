import {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {store} from 'src/store';
import {ScreenNavigation} from 'src/navigation/stack';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Usage of "messaging().registerDeviceForRemoteMessages()" is not required.',
]);

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    //do sth with   enabled
  }
};
const registerDeviceInFireBaseMesages = async () => {
  await messaging().registerDeviceForRemoteMessages();
};

const getFireBaseMesagesToken = async () => {
  await messaging().getToken();
  //do sth with   token
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    registerDeviceInFireBaseMesages();
    getFireBaseMesagesToken(); // for testing purposes
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(() => {
      //do sth with   remoteMessage.notification
    });

    messaging()
      .getInitialNotification()
      .then(() => {
        //do sth with   remoteMessage.notification
      });
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      //do sth with   remoteMessage.notification
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <ScreenNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
