import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'components/Main';
import {AddRecord} from 'components/AddRecord';

export type RootStackParamList = {
  AddRecord: undefined;
  Main: undefined;
};

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
