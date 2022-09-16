import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs/MainTabs';
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
        gestureEnabled: false,
      }}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="AddRecord" component={AddRecord} />
    </Stack.Navigator>
  );
};
