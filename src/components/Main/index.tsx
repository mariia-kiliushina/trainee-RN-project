import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {Home} from 'components/Home';
import {icons} from 'assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/App';
import {AddRecord} from 'components/AddRecord';
import {Button} from 'components/Button';

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

export const Main = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onNavigate = (path: string) => {
    let pathObj = {
      name: path,
      key: '',
    };
    navigation.navigate(pathObj);
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let name = route.name.toLowerCase();
          if (name === 'ffasdasdasdasd') {
            name = 'cross';
          }

          let Icon = icons[name];
          return <Icon color={color} />;
        },
        tabBarActiveTintColor: COLORS.violet100,
        tabBarInactiveTintColor: '#C6C6C6',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen
        options={{
          tabBarButton: () => (
            <Button
              onPress={() => onNavigate('AddRecord')}
              iconStyle={{marginRight: 0}}
              style={{
                position: 'relative',
                top: -16,
                left: 0,
              }}
              iconHeight={56}
              iconWidth={56}
              iconName="addRecord"
              type="link"
            />
          ),
        }}
        name="AddRecord"
        component={AddRecord}
      />
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
