import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
import {AddRecord} from 'screens/AddRecord';
// import {Onboarding} from 'screens/Onboarding';
import {Video} from 'screens/Video';
import {Login} from 'screens/Login';
import {BottomSheetModal} from 'screens/BottomSheetModal';
import {selectProfile} from 'src/store/profileSlice/selectors';
import {useAppSelector} from 'src/hooks';
import {RootStackParamList} from '../types';

export const ScreenNavigation = () => {
  const {isSignedIn} = useAppSelector(selectProfile);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen
            options={{headerShown: true}}
            name="AddRecord"
            component={AddRecord}
          />
          <Stack.Screen name="Video" component={Video} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Video} />
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
