import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
import {AddRecord} from 'screens/AddRecord';
import {Onboarding} from 'screens/Onboarding';
import {Login} from 'screens/Login';
import {BottomSheetModal} from 'screens/BottomSheetModal';
import {RootStackParamList} from '../types';
import {useAppSelector} from 'src/hooks';

export const ScreenNavigation = () => {
  const isSignedIn = useAppSelector(state => state.profile.isSignedIn);

  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        options={{headerShown: true}}
        name="AddRecord"
        component={AddRecord}
      /> */}
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen
            options={{headerShown: true}}
            name="AddRecord"
            component={AddRecord}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: isSignedIn ? 'pop' : 'push',
            }}
          />
        </>
      )}
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
