import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
import {Onboarding} from 'screens/Onboarding';
import {Posts} from 'screens/Posts';
import {GeolocationScreen} from 'screens/GeolocationScreen';
import {Animations} from 'screens/Animations';
import {ChangePassword} from 'screens/ChangePassword';
import {Video} from 'screens/Video';
import {Login} from 'screens/Login';
import {BottomSheetModal} from 'screens/BottomSheetModal';
import {PopUpModal} from 'screens/PopUpModal';
import {OtpModal} from 'screens/OtpModal';
import {Bills} from 'screens/Bills';
import {selectProfile} from 'src/store/profileSlice/selectors';
import {useAppSelector} from 'src/hooks/redux';
import {RootStackParamList} from '../types';
import {COLORS} from 'src/constants/colors';

export const ScreenNavigation = () => {
  const isSignedIn = useAppSelector(selectProfile);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.omniPrimaryColor,
        },
        headerTintColor: COLORS.genericWhite,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Animations" component={Animations} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen
            name="Bills"
            component={Bills}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{headerTitle: 'Change Password'}}
          />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen
            name="GeolocationScreen"
            component={GeolocationScreen}
            options={{headerTitle: 'Geolocation Screen'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: isSignedIn ? 'pop' : 'push',
              headerShown: false,
            }}
          />
        </>
      )}
      <Stack.Group
        screenOptions={{
          animation: 'fade',
          presentation: 'transparentModal',
          gestureEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="BottomSheetModal" component={BottomSheetModal} />
        <Stack.Screen name="PopUpModal" component={PopUpModal} />
        <Stack.Screen name="OtpModal" component={OtpModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
