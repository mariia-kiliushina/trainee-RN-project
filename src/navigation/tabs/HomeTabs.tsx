import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {Main} from 'src/screens/Main';
import {
  Arrow,
  UserIcon,
  HomeIcon,
  BudgetIcon,
  TransactionIcon,
  IconsType,
} from 'assets/svg';

const icons: IconsType = {
  arrow: Arrow,
  profile: UserIcon,
  main: HomeIcon,
  budget: BudgetIcon,
  transaction: TransactionIcon,
};

const Transaction = () => {
  return (
    <View style={styles.main}>
      <Typography variant="18">Transaction</Typography>
    </View>
  );
};
const Budget = () => {
  return (
    <View style={styles.main}>
      <Typography variant="18">Budget</Typography>
    </View>
  );
};
const Profile = () => {
  return (
    <View style={styles.main}>
      <Typography variant="18">Profile</Typography>
    </View>
  );
};

export type HomeTabsParamList = {
  Main: undefined;
  Transaction: undefined;
  Budget: undefined;
  Profile: undefined;
};

export const Home = () => {
  const Tab = createBottomTabNavigator<HomeTabsParamList>();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let name = route.name.toLowerCase();
          let Icon = icons[name];
          return <Icon color={color} />;
        },
        tabBarActiveTintColor: COLORS.violet100,
        tabBarInactiveTintColor: COLORS.supportingGrey,
      })}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
});
