import {useEffect} from 'react';
import {StatusBar, LogBox, StyleSheet} from 'react-native';
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

  return enabled;
};

const initFunc = async () => {
  const permission = await requestUserPermission();

  if (permission) {
    messaging().registerDeviceForRemoteMessages();
    messaging().getToken(); // for testing purposes
    messaging().onMessage(async () => {
      //do sth with   remoteMessage.notification
    });
  }
};

const App = () => {
  useEffect(() => {
    initFunc();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Provider store={store}>
        <GestureHandlerRootView style={styles.gestureHandlerWrapper}>
          <NavigationContainer>
            <ScreenNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  gestureHandlerWrapper: {
    flex: 1,
  },
});
