import {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Profile} from 'screens/Profile';
import {Budget} from 'screens/Budget';
import {Transaction} from 'src/screens/Transaction';
import {Home} from 'screens/Home';
import {ProfileIcon, HomeIcon, BudgetIcon, TransactionIcon} from 'assets/svg';
import {Alert, BackHandler} from 'react-native';
import {HomeTabsParamList} from '../types';

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
        tabBarActiveTintColor: COLORS.warning500,
        tabBarInactiveTintColor: COLORS.neutral300,
      }}
      backBehavior={'history'}
    >
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
        options={{tabBarIcon: ProfileIcon}}
      />
    </Tab.Navigator>
  );
};
