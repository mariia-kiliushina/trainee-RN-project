import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
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
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AddRecord" component={AddRecord} />
    </Stack.Navigator>
  );
};
