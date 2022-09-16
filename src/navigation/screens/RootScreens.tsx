import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from 'src/navigation/tabs/HomeTabs';
import {AddRecord} from 'screens/AddRecord';

export type RootStackParamList = {
  AddRecord: undefined;
  Home: undefined;
};

export const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddRecord" component={AddRecord} />
    </Stack.Navigator>
  );
};
