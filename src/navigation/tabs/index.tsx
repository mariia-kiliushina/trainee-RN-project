import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Profile} from 'screens/Profile';
import {Budget} from 'screens/Budget';
import {Transaction} from 'screens/Transaction';
import {Home} from 'screens/Home';
import {UserIcon, HomeIcon, BudgetIcon, TransactionIcon} from 'assets/svg';
import {Alert, BackHandler} from 'react-native';

export type HomeTabsParamList = {
  Home: undefined;
  Transaction: undefined;
  Budget: undefined;
  Profile: undefined;
};

export const Main = () => {
  const Tab = createBottomTabNavigator<HomeTabsParamList>();
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.violet100,
        tabBarInactiveTintColor: COLORS.supportingGrey,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: HomeIcon}}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{tabBarIcon: TransactionIcon}}
      />
      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{tabBarIcon: BudgetIcon}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarIcon: UserIcon}}
      />
    </Tab.Navigator>
  );
};
