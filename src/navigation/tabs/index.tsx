import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from 'constants/colors';
import {Profile} from 'screens/Profile';
import {Budget} from 'screens/Budget';
import {Transaction} from 'src/screens/Transaction';
import {Home} from 'screens/Home';
import {Bills} from 'screens/Bills';
import {ProfileIcon, HomeIcon, BudgetIcon, TransactionIcon} from 'assets/svg';
import {HomeTabsParamList} from '../types';

export const Main = () => {
  const Tab = createBottomTabNavigator<HomeTabsParamList>();

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
        name="Bills"
        component={Bills}
        options={{tabBarIcon: BudgetIcon}}
      />
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
