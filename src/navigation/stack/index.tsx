import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from 'src/navigation/tabs';
import {AddRecord} from 'screens/AddRecord';
import {Posts} from 'screens/Posts';
import {PostsReanimated} from 'screens/PostsReanimated';
import {Animations} from 'screens/Animations';
import {Onboarding} from 'screens/Onboarding';
import {Video} from 'screens/Video';
import {Login} from 'screens/Login';
import {BottomSheetModal} from 'screens/BottomSheetModal';
import {PopUpModal} from 'screens/PopUpModal';
import {selectProfile} from 'src/store/profileSlice/selectors';
import {useAppSelector} from 'src/hooks/redux';
import {RootStackParamList} from '../types';

export const ScreenNavigation = () => {
  const isSignedIn = useAppSelector(selectProfile);
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
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="PostsReanimated" component={PostsReanimated} />
          <Stack.Screen name="Animations" component={Animations} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: isSignedIn ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="Video" component={Video} />
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
        <Stack.Screen name="PopUpModal" component={PopUpModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
