import {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'src/constants/colors';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentLayout?: StyleProp<ViewStyle>;
};

export let paddingHorizontalExported: number;

export const Container = ({children, style, contentLayout}: Props) => {
  const insets = useSafeAreaInsets();
  let {width} = Dimensions.get('window');

  const getPaddingHorizontal = (deviceWidth: number) => {
    if (deviceWidth < 480) {
      return 16;
    } else if (deviceWidth < 720) {
      return 24;
    } else if (deviceWidth < 830) {
      return 36;
    } else {
      return 42;
    }
  };

  paddingHorizontalExported = getPaddingHorizontal(width);

  return (
    <SafeAreaView
      style={[{paddingTop: insets.top}, styles.safeAreaStyle, style]}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={[styles.contentContainerStyle, contentLayout]}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  safeAreaStyle: {
    backgroundColor: COLORS.genericWhite,
    flexGrow: 1,
  },
});
