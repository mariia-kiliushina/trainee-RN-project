import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {TPopUpModalParams} from 'src/screens/PopUpModal';

export type RootStackParamList = {
  Posts: undefined;
  ScrollScreen: undefined;
  GeolocationScreen: undefined;
  Animations: undefined;
  Timer: undefined;
  Video: undefined;
  Main: undefined;
  Onboarding: undefined;
  Login: undefined;
  BottomSheetModal: {children: React.ReactNode};
  PopUpModal: TPopUpModalParams;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabsParamList = {
  Home: undefined;
  Transaction: undefined;
  Budget: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
