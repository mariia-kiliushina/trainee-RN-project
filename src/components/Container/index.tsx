import {ReactNode} from 'react';
import {StyleProp, StyleSheet, SafeAreaView, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'src/constants/colors';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentLayout?: StyleProp<ViewStyle>;
};

export const Container = ({children, style, contentLayout}: Props) => {
  const insets = useSafeAreaInsets();

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
