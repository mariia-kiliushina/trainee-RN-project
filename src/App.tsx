import 'react-native-gesture-handler';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNavigation} from 'src/navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from 'src/store';
import {Provider} from 'react-redux';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Provider store={store}>
        <NavigationContainer>
          <ScreenNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
