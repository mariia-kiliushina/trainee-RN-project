import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {Home} from 'components/Home';
import {PieChart, HomeIcon, User, Transaction} from 'assets/svg';

const Transactions = () => {
  return (
    <View style={styles.main}>
      <Typography variant="18">Transactions</Typography>
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

export const Main = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let Icon;
          if (route.name === 'Home') {
            Icon = HomeIcon;
          } else if (route.name === 'Transactions') {
            Icon = Transaction;
          } else if (route.name === 'Budget') {
            Icon = PieChart;
          } else if (route.name === 'Profile') {
            Icon = User;
          }
          //@ts-ignore
          return <Icon size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.violet100,
        tabBarInactiveTintColor: '#C6C6C6',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transactions" component={Transactions} />
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
