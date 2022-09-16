import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from 'screens/Main';
import {AddRecord} from 'screens/AddRecord';

export type RootStackParamList = {
  AddRecord: undefined;
  Main: undefined;
};

export const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="AddRecord" component={AddRecord} />
    </Stack.Navigator>
  );
};
