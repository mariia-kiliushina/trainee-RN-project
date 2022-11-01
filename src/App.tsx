import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNavigation} from 'src/navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

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
      <NavigationContainer>
        <ScreenNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
