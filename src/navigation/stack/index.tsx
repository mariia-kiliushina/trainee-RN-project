// import React, {ReactComponentElement} from 'react';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
import {AddRecord} from 'screens/AddRecord';
import {BottomSheetModal} from 'screens/BottomSheetModal';

export type RootStackParamList = {
  AddRecord: undefined;
  Main: undefined;
  BottomSheetModal: {children: React.ReactNode};
};

export const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        options={{headerShown: true}}
        name="AddRecord"
        component={AddRecord}
      />
      <Stack.Group
        screenOptions={{
          animation: 'fade',
          presentation: 'transparentModal',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="BottomSheetModal" component={BottomSheetModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
